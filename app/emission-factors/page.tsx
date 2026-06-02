"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getEmissionFactors } from "@/lib/client/api/getEmissionFactors";
import { createEmissionFactor } from "@/lib/client/api/createEmissionFactor";
import { updateEmissionFactor } from "@/lib/client/api/updateEmissionFactor";
import { deleteEmissionFactor } from "@/lib/client/api/deleteEmissionFactor";
import type { EmissionFactor } from "@/lib/client/types/emissionFactors";
import { ApiError } from "@/lib/client/errors/ApiError";
import FactorModal from "@/components/emission-factors/FactorModal";
import FactorTable from "@/components/emission-factors/FactorTable";
import { FactorFormSchema, type FactorFormType } from "@/components/emission-factors/FactorForm";

export default function FactorMain() {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingFactor, setEditingFactor] = useState<EmissionFactor | undefined>();

    const factorsQuery = useQuery({
        queryKey: ["emission-factors"],
        queryFn: getEmissionFactors,
    });

    const form = useForm<FactorFormType>({
        resolver: zodResolver(FactorFormSchema),
        defaultValues: {
            name: "",
            category: "",
            factor: 0.456,
            inputUnit: "kWh",
            outputUnit: "kgCO2e",
            description: "",
        },
    });

    const factors = factorsQuery.data ?? [];

    const closeModal = () => {
        setModalOpen(false);
        setEditingFactor(undefined);
    };

    const openCreateModal = () => {
        setEditingFactor(undefined);
        form.reset({
            name: "",
            category: "ELECTRICITY",
            factor: 0.456,
            inputUnit: "kWh",
            outputUnit: "kgCO2e",
            description: "전력 사용 배출 계수",
        });
        setModalOpen(true);
    };

    const onSubmit: SubmitHandler<FactorFormType> = async (data) => {
        try {
            const { id, name, category, factor, inputUnit, outputUnit, description } = data;

            if (editingFactor && id) {
                await updateEmissionFactor({
                    id,
                    name,
                    category,
                    factor,
                    inputUnit,
                    outputUnit,
                    description: description || undefined,
                });
                toast.success("배출 계수가 수정되었습니다");
            } else {
                await createEmissionFactor({
                    name,
                    category,
                    factor,
                    inputUnit,
                    outputUnit,
                    description: description || undefined,
                });
                toast.success("배출 계수가 생성되었습니다");
            }

            factorsQuery.refetch();
            closeModal();
        } catch (e) {
            if (e instanceof ApiError) toast.error(e.message);
            else toast.error(JSON.stringify(e));
            toast.error(editingFactor ? "수정에 실패했습니다" : "생성에 실패했습니다");
        }
    };

    const onEdit = (factor: EmissionFactor) => {
        setEditingFactor(factor);
        setModalOpen(true);
    };

    const onDelete = async (id: number) => {
        try {
            await deleteEmissionFactor(id);
            toast.success("배출 계수가 삭제되었습니다");
            factorsQuery.refetch();
        } catch (e) {
            if (e instanceof ApiError) toast.error(e.message);
            else toast.error("삭제에 실패했습니다");
        }
    };

    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
            <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-medium text-amber-600">Emission Factors</p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">배출 계수</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        활동량에 곱해 CO2e 환산 배출량을 계산합니다. (예: 전기 0.456 kgCO2e/kWh)
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={openCreateModal}
                        className="cursor-pointer rounded-xl border border-amber-600 bg-white px-5 py-3 text-sm font-semibold text-amber-600 hover:bg-amber-50"
                    >
                        배출 계수 생성
                    </button>
                    <button
                        onClick={() => factorsQuery.refetch()}
                        className="cursor-pointer rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-700"
                    >
                        새로고침
                    </button>
                </div>
            </header>

            <FactorModal
                isOpen={modalOpen}
                factor={editingFactor}
                form={form}
                onSubmit={onSubmit}
                onClose={closeModal}
            />

            <FactorTable factors={factors} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
}
