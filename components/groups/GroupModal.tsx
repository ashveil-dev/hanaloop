"use client";

import ReactModal from "react-modal";
import GroupForm, { GroupFormSchema, type GroupFormType } from "@/components/groups/GroupForm";
import GroupListPicker from "@/components/groups/GroupListPicker";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Group } from "@/lib/client/types/groups";

type Props = {
    isOpen: boolean;
    group?: Group;
    groups: Group[] | undefined;
    pickerKey: number;
    onClose: () => void;
    onCreate: (name: string, parentId: string | null | undefined) => void;
    onUpdate: (id: number, name: string, parentId: string | null | undefined) => void;
};

export default function GroupModal({
    isOpen,
    group,
    groups,
    pickerKey,
    onClose,
    onCreate,
    onUpdate,
}: Props) {
    const form = useForm<GroupFormType>({
        resolver: zodResolver(GroupFormSchema),
        defaultValues: { name: "", parentId: "" },
    });

    const parentId = form.watch("parentId");
    const selectedParentId =
        parentId && parentId !== "" ? Number(parentId) : null;

    const handleParentSelect = (selected: Group | null) => {
        form.setValue("parentId", selected ? selected.id.toString() : "", {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const onSubmit: SubmitHandler<GroupFormType> = ({ id, name, parentId }) => {
        const normalizedParentId = parentId === "" ? undefined : parentId;

        if (group && id) {
            onUpdate(id, name, normalizedParentId);
        } else {
            onCreate(name, normalizedParentId);
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={group ? "그룹 수정" : "그룹 생성"}
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content ReactModal__Content--group"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
        >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <div className="min-w-0 flex-1">
                    <GroupForm
                        form={form}
                        group={group}
                        groups={groups}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                    />
                </div>

                <div className="modal-group-panel flex h-52 shrink-0 flex-col overflow-hidden border-t border-slate-200 pt-5 md:h-[26rem] md:w-64 md:border-t-0 md:border-l md:pl-5 md:pt-0 lg:w-72">
                    <GroupListPicker
                        key={pickerKey}
                        title="상위 그룹 선택"
                        description="없음 또는 목록에서 상위 그룹을 선택하세요"
                        groups={groups}
                        selectedId={selectedParentId}
                        excludeId={group?.id}
                        allowNone
                        onSelect={handleParentSelect}
                    />
                </div>
            </div>
        </ReactModal>
    );
}
