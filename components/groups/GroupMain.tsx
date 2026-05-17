"use client";

import { useRef, useState } from "react";
import GroupHeader from "@/components/groups/GroupHeader"
import GroupForm from "@/components/groups//GroupForm";
import GroupTable from "@/components/groups//GroupTable";
import GroupCard from "@/components/groups//GroupCard";
import { createGroup } from "@/lib/client/api/createGroup";
import { getGroups } from "@/lib/client/api/getGroups";
import { updateGroup } from "@/lib/client/api/updateGroup";
import { deleteGroup } from "@/lib/client/api/deleteGroup";
import { useQuery } from "@tanstack/react-query";
import type { Group } from "@/lib/client/types/groups";


export default function GroupMain() {
  const formRef = useRef<HTMLFormElement>(null);
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const groupsQuery = useQuery({
    queryKey: ["Groups"],
    queryFn: getGroups
  })

  const onCreateGroup = async (name: string, parentId: string | null | undefined) => {
    try {
      await createGroup({ name, parentId })
    } catch (e) {
      alert("Error");
      console.log(e)
    }
  };

  const onUpdateGroup = async (id: number, name: string, parentId: string | null | undefined) => {
    try {
      let _parentId = undefined;
      if (parentId === null || parentId === undefined) _parentId = undefined;
      else _parentId = parseInt(parentId)

      await updateGroup({ id, name, parentId : _parentId })
      setGroup(undefined);
      groupsQuery.refetch();
    } catch (e) {
      alert("Error");
      console.log(e)
    }
  };

  const onDeleteGroup = async (id: number) => {
    try {
      await deleteGroup({ id })
      groupsQuery.refetch();
    } catch (e) {
      alert("Error");
      console.log(e)
    }
  };

  const onEdit = (group: Group) => {
    setGroup(group);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const onCancel = () => {
    setGroup(undefined);
  }

  const onRefresh = () => {
    groupsQuery.refetch();
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
      <GroupHeader onRefresh={onRefresh}/>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="xl:col-span-1">
          <GroupForm
            ref={formRef}
            group={group}
            groups={groupsQuery.data}
            onCreate={onCreateGroup}
            onUpdate={onUpdateGroup}
            onDelete={onDeleteGroup}
            onCancel={onCancel}
          />
        </section>

        <section className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <GroupCard title="전체 그룹" value={groupsQuery.data?.length.toString() ?? "0"} desc="등록된 조직 단위" />
            <GroupCard title="최상위 그룹" value={groupsQuery.data?.filter((g) => g.parentId === null).length.toString() ?? "0"} desc="Parent가 없는 그룹" />
            <GroupCard title="하위 그룹" value={groupsQuery.data?.filter((g) => g.parentId !== null).length.toString() ?? "0"} desc="계층에 포함된 그룹" dark />
          </div>

          <GroupTable
            groups={groupsQuery.data}
            onEdit={onEdit}
            onDelete={onDeleteGroup}
          />
        </section>
      </div>
    </div>
  );
}