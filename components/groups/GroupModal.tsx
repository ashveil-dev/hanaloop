"use client";

import ReactModal from "react-modal";
import GroupForm from "@/components/groups/GroupForm";
import type { Group } from "@/lib/client/types/groups";

type Props = {
    isOpen: boolean;
    group?: Group;
    groups: Group[] | undefined;
    onClose: () => void;
    onCreate: (name: string, parentId: string | null | undefined) => void;
    onUpdate: (id: number, name: string, parentId: string | null | undefined) => void;
};

export default function GroupModal({
    isOpen,
    group,
    groups,
    onClose,
    onCreate,
    onUpdate,
}: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={group ? "그룹 수정" : "그룹 생성"}
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
        >
            <GroupForm
                group={group}
                groups={groups}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onCancel={onClose}
            />
        </ReactModal>
    );
}
