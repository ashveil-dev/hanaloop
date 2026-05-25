"use client";

import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import RecordForm, { type RecordFormType } from "@/components/records/RecordForm";
import RecordGroupPicker from "@/components/records/RecordGroupPicker";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { Group } from "@/lib/client/types/groups";
import type { EmissionFactor } from "@/lib/client/types/emissionFactors";

type Props = {
    isOpen: boolean;
    isEdit: boolean;
    form: UseFormReturn<RecordFormType>;
    groups: Group[] | undefined;
    emissionFactors: EmissionFactor[] | undefined;
    pickerKey: number;
    onSubmit: SubmitHandler<RecordFormType>;
    onClose: () => void;
};

export default function RecordModal({
    isOpen,
    isEdit,
    form,
    groups,
    emissionFactors,
    pickerKey,
    onSubmit,
    onClose,
}: Props) {
    const formColRef = useRef<HTMLDivElement>(null);
    const [pickerHeight, setPickerHeight] = useState<number | undefined>(undefined);
    const [syncPickerHeight, setSyncPickerHeight] = useState(false);
    const selectedGroupId = form.watch("groupId");

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const updateSync = () => setSyncPickerHeight(media.matches);

        updateSync();
        media.addEventListener("change", updateSync);
        return () => media.removeEventListener("change", updateSync);
    }, []);

    useEffect(() => {
        if (!isOpen || !syncPickerHeight || !formColRef.current) {
            setPickerHeight(undefined);
            return;
        }

        const element = formColRef.current;
        const updateHeight = () => setPickerHeight(element.offsetHeight);

        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);

        return () => observer.disconnect();
    }, [isOpen, isEdit, pickerKey, syncPickerHeight]);

    const handleGroupSelect = (group: Group) => {
        form.setValue("groupId", group.id, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={isEdit ? "레코드 수정" : "레코드 생성"}
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content ReactModal__Content--record"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
        >
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <div ref={formColRef} className="min-w-0 shrink-0 md:flex-1">
                    <RecordForm
                        form={form}
                        groups={groups}
                        emissionFactors={emissionFactors}
                        isEdit={isEdit}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                    />
                </div>

                <div
                    className="modal-group-panel flex min-h-0 w-full flex-col overflow-hidden border-t border-slate-200 pt-5 md:w-64 md:shrink-0 md:border-t-0 md:border-l md:pl-5 md:pt-0 lg:w-72"
                    style={
                        syncPickerHeight && pickerHeight
                            ? { height: `${pickerHeight}px` }
                            : undefined
                    }
                >
                    <RecordGroupPicker
                        key={pickerKey}
                        groups={groups}
                        selectedId={selectedGroupId}
                        onSelect={handleGroupSelect}
                    />
                </div>
            </div>
        </ReactModal>
    );
}
