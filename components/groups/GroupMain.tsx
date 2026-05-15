"use client";

import { useEffect, useState } from "react";
import GroupHeader from "@/components/groups/GroupHeader"
import GroupForm from "@/components/groups//GroupForm";
import GroupTable from "@/components/groups//GroupTable";
import GroupCard from "@/components/groups//GroupCard";
import { getGroups } from "@/lib/client/api/getGroups";


export type Group = {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
};

const initialGroups: Group[] = [
  { id: 1, name: "본사", parentId: null, createdAt: "2026-05-15" },
  { id: 2, name: "공장 A", parentId: 1, createdAt: "2026-05-15" },
  { id: 3, name: "물류센터", parentId: 1, createdAt: "2026-05-15" },
];

export default function GroupMain() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const createGroup = (name: string, parentId: number | null) => {
    setGroups((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        parentId,
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const updateGroup = (id: number, name: string, parentId: number | null) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, name, parentId } : group
      )
    );
    setEditingGroup(null);
  };

  const deleteGroup = (id: number) => {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await getGroups();
        setGroups(response)
      } catch(e) {
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
            <GroupCard title="전체 그룹" value={groups.length.toString()} desc="등록된 조직 단위" />
            <GroupCard title="최상위 그룹" value={groups.filter((g) => g.parentId === null).length.toString()} desc="Parent가 없는 그룹" />
            <GroupCard title="하위 그룹" value={groups.filter((g) => g.parentId !== null).length.toString()} desc="계층에 포함된 그룹" dark />
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