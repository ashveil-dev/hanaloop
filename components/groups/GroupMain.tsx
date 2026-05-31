"use client";

import { useState } from "react";
import { toast } from "sonner";
import GroupHeader from "@/components/groups/GroupHeader";
import GroupModal from "@/components/groups/GroupModal";
import GroupTable from "@/components/groups/GroupTable";
import GroupCard from "@/components/groups/GroupCard";
import { createGroup } from "@/lib/client/api/createGroup";
import { getGroups } from "@/lib/client/api/getGroups";
import { updateGroup } from "@/lib/client/api/updateGroup";
import { deleteGroup } from "@/lib/client/api/deleteGroup";
import { useQuery } from "@tanstack/react-query";
import type { Group } from "@/lib/client/types/groups";
import { ApiError } from "@/lib/client/errors/ApiError";


export default function GroupMain() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSession, setModalSession] = useState(0);
  const [editingGroup, setEditingGroup] = useState<Group | undefined>(undefined);
  const groupsQuery = useQuery({
    queryKey: ["Groups"],
    queryFn: getGroups
  })

  const closeModal = () => {
    setModalOpen(false);
    setEditingGroup(undefined);
  };

  const openCreateModal = () => {
    setEditingGroup(undefined);
    setModalSession((s) => s + 1);
    setModalOpen(true);
  };

  const onCreateGroup = async (name: string, parentId: string | null | undefined) => {
    try {
      await createGroup({ name, parentId })
      toast.success("그룹을 생성하였습니다")
      groupsQuery.refetch();
      closeModal();
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message)
      } else {
        toast.error(JSON.stringify(e))
      }

      toast.error("그룹 생성을 실패하였습니다")
    }
  };

  const onUpdateGroup = async (id: number, name: string, parentId: string | null | undefined) => {
    try {
      let _parentId = undefined;
      if (parentId === null || parentId === undefined) _parentId = undefined;
      else _parentId = parseInt(parentId)

      await updateGroup({ id, name, parentId: _parentId })
      toast.success("그룹을 수정하였습니다")
      groupsQuery.refetch();
      closeModal();
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message)
      } else {
        toast.error(JSON.stringify(e))
      }

      toast.error("그룹 수정을 실패하였습니다")
    }
  };

  const onDeleteGroup = async (id: number) => {
    try {
      await deleteGroup({ id })
      toast.success("그룹을 삭제하였습니다")
      groupsQuery.refetch();
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message)
      } else {
        toast.error(JSON.stringify(e))
      }

      toast.error("그룹 삭제를 실패하였습니다")
    }
  };

  const onEdit = (group: Group) => {
    setEditingGroup(group);
    setModalSession((s) => s + 1);
    setModalOpen(true);
  }

  const onRefresh = () => {
    groupsQuery.refetch();
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
      <GroupHeader onRefresh={onRefresh} onCreate={openCreateModal} />

      <GroupModal
        isOpen={modalOpen}
        group={editingGroup}
        groups={groupsQuery.data}
        pickerKey={modalSession}
        onClose={closeModal}
        onCreate={onCreateGroup}
        onUpdate={onUpdateGroup}
      />

      <div className="mt-8 space-y-6">
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
      </div>
    </div>
  );
}
