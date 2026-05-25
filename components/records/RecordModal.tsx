"use client";

import ReactModal from "react-modal";
import RecordForm, { type RecordFormType } from "@/components/records/RecordForm";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

type Props = {
    isOpen: boolean;
    isEdit: boolean;
    form: UseFormReturn<RecordFormType>;
    onSubmit: SubmitHandler<RecordFormType>;
    onClose: () => void;
};

export default function RecordModal({
    isOpen,
    isEdit,
    form,
    onSubmit,
    onClose,
}: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={isEdit ? "레코드 수정" : "레코드 생성"}
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
        >
            <RecordForm
                form={form}
                isEdit={isEdit}
                onSubmit={onSubmit}
                onCancel={onClose}
            />
        </ReactModal>
    );
}
