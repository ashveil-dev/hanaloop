import { db } from "@/lib/server/db"
import { sql, eq } from "drizzle-orm";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { GroupsTable } from "@/lib/server/db/schema/groups";
import { ApiError } from "@/lib/server/errors/ApiError";

type getHierarchyParameterType = {
    id: number | null,
}

type Emission = {
    scope1: number
    scope2: number
    scope3: number
    total: number
}

type GroupNode = {
    id: number | null
    name: string,
    parent_id: number | null,
    unit : string,

    directEmission: Emission,
    childrenEmission: Emission,
    totalEmission: Emission

    children?: GroupNode[]
}

export function makeHierarchy(id: number | null, groups: GroupNode[], groupsNode: Map<number | null, GroupNode>): GroupNode {
    const children = []
    const currentGroup = groupsNode.get(id) as GroupNode

    for (const group of groups) {
        if (group.parent_id === id) {
            children.push(makeHierarchy(group.id, groups, groupsNode))
        }
    }

    let scope1 = children.reduce((acc, cur) => acc + (cur.directEmission?.scope1 ?? 0), 0);
    let scope2 = children.reduce((acc, cur) => acc + (cur.directEmission?.scope2 ?? 0), 0);
    let scope3 = children.reduce((acc, cur) => acc + (cur.directEmission?.scope3 ?? 0), 0);
    const childrenEmission: Emission = {
        scope1,
        scope2,
        scope3,
        total: scope1 + scope2 + scope3,
    }

    scope1 = currentGroup.directEmission?.scope1 + childrenEmission.scope1
    scope2 = currentGroup.directEmission?.scope2 + childrenEmission.scope2
    scope3 = currentGroup.directEmission?.scope3 + childrenEmission.scope3
    const totalEmission: Emission = {
        scope1,
        scope2,
        scope3,
        total: scope1 + scope2 + scope3
    }
    totalEmission.total = totalEmission.scope1 + totalEmission.scope2 + totalEmission.scope3

    return {
        ...currentGroup,
        childrenEmission,
        totalEmission,
        children
    }
}

export async function getHierarchy({
    id,
}: getHierarchyParameterType) {
    const nodeMap = new Map<number | null, GroupNode>()
    const groups = await db
        .select({
            id: GroupsTable.id,
            name: GroupsTable.name,
            parent_id: GroupsTable.parentId,
            scope1Emission: sql<number>`
                COALESCE(SUM(CASE 
                    WHEN ${EmissionRecordsTable.scopeType} = 'SCOPE1' 
                    THEN ${EmissionRecordsTable.amount} 
                    ELSE 0 
                END), 0)`
                .mapWith(Number),

            scope2Emission: sql<number>`
                COALESCE(SUM(CASE 
                    WHEN ${EmissionRecordsTable.scopeType} = 'SCOPE2' 
                    THEN ${EmissionRecordsTable.amount} 
                    ELSE 0 
                END), 0)`
                .mapWith(Number),

            scope3Emission: sql<number>`
                COALESCE(SUM(CASE 
                    WHEN ${EmissionRecordsTable.scopeType} = 'SCOPE3' 
                    THEN ${EmissionRecordsTable.amount} 
                    ELSE 0 
                END), 0)`
                .mapWith(Number),
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
    const tempGroups: GroupNode[] = []
    for (const group of groups) {
        const tempGroup: GroupNode = {
            id: group.id,
            name: group.name,
            parent_id: group.parent_id,
            unit: "tCO2e",
            directEmission: {
                scope1: group.scope1Emission,
                scope2: group.scope2Emission,
                scope3: group.scope3Emission,
                total: group.scope1Emission + group.scope2Emission + group.scope3Emission
            },
            childrenEmission: {
                scope1: 0,
                scope2: 0,
                scope3: 0,
                total: 0,
            },
            totalEmission: {
                scope1: 0,
                scope2: 0,
                scope3: 0,
                total: 0,
            },
            children: []
        }
        tempGroups.push(tempGroup)
        nodeMap.set(group.id, tempGroup)
    }

    if (!nodeMap.has(id))
        throw new ApiError({
            message: "The provided group id does not exist",
            status: 400
        })

    return makeHierarchy(id, tempGroups, nodeMap)
}
