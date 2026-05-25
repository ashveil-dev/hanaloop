"use client";

import ReactModal from "react-modal";
import FactorForm, { FactorFormType } from "@/components/emission-factors/FactorForm";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { EmissionFactor } from "@/lib/client/types/emissionFactors";

type Props = {
    isOpen: boolean;
    factor?: EmissionFactor;
    form: UseFormReturn<FactorFormType>;
    onSubmit: SubmitHandler<FactorFormType>;
    onClose: () => void;
};

export default function FactorModal({ isOpen, factor, form, onSubmit, onClose }: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={factor ? "배출 계수 수정" : "배출 계수 생성"}
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
        >
            <FactorForm form={form} factor={factor} onSubmit={onSubmit} onCancel={onClose} />
        </ReactModal>
    );
}
