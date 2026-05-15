"use client";

import { useEffect, useState } from "react";
import GroupHeader from "@/components/groups/GroupHeader"
import GroupForm from "@/components/groups//GroupForm";
import GroupTable from "@/components/groups//GroupTable";
import GroupCard from "@/components/groups//GroupCard";
import { createGroupApi } from "@/lib/client/api/createGroup";
import { getGroups } from "@/lib/client/api/getGroups";
import { updateGroupApi } from "@/lib/client/api/updateGroup";


export type Group = {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
};

export default function GroupMain() {
  const [groups, setGroups] = useState<Group[]>();
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const createGroup = async (name: string, parentId: number | null) => {
    try {
      const response = await createGroupApi({ name, parentId })
    } catch (e) {
      console.log(e)
    }
  };

  const updateGroup = async (id: number, name: string, parentId: number | null) => {
    try {
      const response = await updateGroupApi({ name, parentId })
    } catch (e) {
      console.log(e)
    }
  };

  const deleteGroup = (id: number) => {
    setGroups((prev) => prev?.filter((group) => group.id !== id));
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await getGroups();
        setGroups(response)
      } catch (e) {
        console.log(e)
      }
    }

    fetchGroups();
  }, []);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
      <GroupHeader />

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="xl:col-span-1">
          <GroupForm
            groups={groups}
            editingGroup={editingGroup}
            onCreate={createGroup}
            onUpdate={updateGroup}
            onCancelEdit={() => setEditingGroup(null)}
          />
        </section>

        <section className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <GroupCard title="전체 그룹" value={groups?.length.toString() ?? "0"} desc="등록된 조직 단위" />
            <GroupCard title="최상위 그룹" value={groups?.filter((g) => g.parentId === null).length.toString() ?? "0"} desc="Parent가 없는 그룹" />
            <GroupCard title="하위 그룹" value={groups?.filter((g) => g.parentId !== null).length.toString() ?? "0"} desc="계층에 포함된 그룹" dark />
          </div>

          <GroupTable
            groups={groups}
            onEdit={setEditingGroup}
            onDelete={deleteGroup}
          />
        </section>
      </div>
    </div>
  );
}