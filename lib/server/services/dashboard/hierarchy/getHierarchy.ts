import { db } from "@/lib/server/db"
import { sql, eq } from "drizzle-orm";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { GroupsTable } from "@/lib/server/db/schema/groups";
import { ApiError } from "@/lib/server/errors/ApiError";

type getHierarchyParameterType = {
    id: number,
}

type GroupNode = {
    id: number
    name: string,
    parent_id: number | null,

    directEmission: number
    totalEmission?: number
    childrenEmission?: number
    children?: GroupNode[]
}

export function makeHierarchy(id: number, groups: GroupNode[], groupsNode: Map<number, GroupNode>): GroupNode {
    const children = []
    const currentGroup = groupsNode.get(id) as GroupNode

    for (const group of groups) {
        if (group.parent_id === id) {
            children.push(makeHierarchy(group.id, groups, groupsNode))
        }
    }

    const childrenEmission = children.reduce((acc, cur) => acc + (cur.totalEmission ?? 0), 0)
    const totalEmission = childrenEmission + currentGroup.directEmission

    return {
        ...currentGroup,
        totalEmission,
        childrenEmission,
        children
    }
}

export async function getHierarchy({
    id,
}: getHierarchyParameterType) {
    const nodeMap = new Map<number, GroupNode>()
    const groups: GroupNode[] = await db
        .select({
            id: GroupsTable.id,
            name: GroupsTable.name,
            parent_id: GroupsTable.parentId,
            directEmission: sql<string>`COALESCE(SUM(${EmissionRecordsTable.amount}), 0)`.mapWith(Number)
        })
        .from(GroupsTable)
        .leftJoin(EmissionRecordsTable, eq(GroupsTable.id, EmissionRecordsTable.groupId))
        .groupBy(
            GroupsTable.id,
            GroupsTable.name,
            GroupsTable.parentId
        );

    // id로 해당 값을 조회할 수 있도록 nodeMap을 만들기
    for (const group of groups) {
        nodeMap.set(group.id, {
            ...group,
            directEmission: group.directEmission,
            children: []
        })
    }

    if (!nodeMap.has(id))
        throw new ApiError({
            message: "The provided group id does not exist",
            status: 400
        })

    return makeHierarchy(id, groups, nodeMap)
}
