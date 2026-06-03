"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { getEmissionRecords } from "@/lib/client/api/getEmissionRecords";
import { createEmissionRecord } from "@/lib/client/api/createEmissionRecord";
import { deleteEmissionRecord } from "@/lib/client/api/deleteEmissionRecord";
import { editEmissionRecord } from "@/lib/client/api/editEmissionRecord";
import { getGroups } from "@/lib/client/api/getGroups";
import { getEmissionFactors } from "@/lib/client/api/getEmissionFactors";
import type { EmissionRecord } from "@/lib/client/types/emissionRecords";
import { ApiError } from "@/lib/client/errors/ApiError";

import RecordHeader from "@/components/records/RecordHeader";
import RecordCard from "@/components/records/RecordCard";
import RecordModal from "@/components/records/RecordModal";
import RecordTable from "@/components/records/RecordTable";
import { RecordFormSchema, type RecordFormType } from "@/components/records/RecordForm";
import CardSkeleton from "@/components/layout/CardSkeleton";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import TableSkeleton from "@/components/layout/TableSkeleton";

export default function RecordMain() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSession, setModalSession] = useState(0);
    const [editingRecord, setEditingRecord] = useState<EmissionRecord | undefined>(undefined);

    const recordsQuery = useQuery({
        queryKey: ["emission-records"],
        queryFn: getEmissionRecords,
    });

    const groupsQuery = useQuery({
        queryKey: ["Groups"],
        queryFn: getGroups,
    });

    const factorsQuery = useQuery({
        queryKey: ["emission-factors"],
        queryFn: getEmissionFactors,
    });

    const form = useForm<RecordFormType>({
        resolver: zodResolver(RecordFormSchema),
    });

    const records = recordsQuery.data ?? [];
    const isLoading =
        recordsQuery.isPending || groupsQuery.isPending || factorsQuery.isPending;
    const isError =
        recordsQuery.isError || groupsQuery.isError || factorsQuery.isError;
    const isEdit = !!editingRecord;

    const totalEmission = records.reduce(
        (acc, cur) => acc + cur.calculatedEmission,
        0
    );
    const scope1Count = records.filter((record) => record.scopeType === "SCOPE1").length;
    const scope2Count = records.filter((record) => record.scopeType === "SCOPE2").length;
    const scope3Count = records.filter((record) => record.scopeType === "SCOPE3").length;

    const closeModal = () => {
        setModalOpen(false);
        setEditingRecord(undefined);
        form.reset();
    };

    const openCreateModal = () => {
        setEditingRecord(undefined);
        const defaultFactorId = factorsQuery.data?.[0]?.id;
        form.reset({
            emissionFactorId: defaultFactorId,
            unit: factorsQuery.data?.[0]?.inputUnit ?? "kWh",
        });
        setModalSession((s) => s + 1);
        setModalOpen(true);
    };

    const onSubmit: SubmitHandler<RecordFormType> = async (data) => {
        try {
            const { id, groupId, emissionFactorId, scopeType, amount, unit, recordedAt } = data;

            if (editingRecord && id) {
                await editEmissionRecord({
                    id,
                    groupId,
                    emissionFactorId,
                    scopeType,
                    amount,
                    unit,
                    recordedAt,
                });
                toast.success("레코드가 수정되었습니다");
            } else {
                await createEmissionRecord({
                    groupId,
                    emissionFactorId,
                    scopeType,
                    amount,
                    unit,
                    recordedAt,
                });
                toast.success("레코드가 생성되었습니다");
            }

            recordsQuery.refetch();
            closeModal();
        } catch (e) {
            if (e instanceof ApiError) {
                toast.error(e.message);
            } else {
                toast.error(JSON.stringify(e));
            }

            toast.error(isEdit ? "레코드 수정을 실패하였습니다" : "레코드 생성을 실패하였습니다");
        }
    };

    const onRefresh = () => {
        recordsQuery.refetch();
    };

    const onEdit = (record: EmissionRecord) => {
        form.reset({
            ...record,
            amount: parseFloat(record.amount),
        });
        setEditingRecord(record);
        setModalSession((s) => s + 1);
        setModalOpen(true);
    };

    const onDelete = async (id: number) => {
        try {
            await deleteEmissionRecord({ id });
            toast.success("레코드를 삭제하였습니다");
            recordsQuery.refetch();
        } catch (e) {
            if (e instanceof ApiError) {
                toast.error(e.message);
            } else {
                toast.error(JSON.stringify(e));
            }

            toast.error("레코드 삭제를 실패하였습니다");
        }
    };

    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
            <RecordHeader onRefresh={onRefresh} onCreate={openCreateModal} />

            {isLoading ? (
                <>
                    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <CardSkeleton count={4} darkLast />
                    </section>
                    <TableSkeleton title="레코드 목록" rows={6} columns={8} />
                </>
            ) : isError ? (
                <LoadingSpinner
                    label="배출 레코드를 불러오지 못했습니다. 새로고침을 시도해주세요."
                    accent="teal"
                />
            ) : (
                <>
                    <RecordModal
                        isOpen={modalOpen}
                        isEdit={isEdit}
                        form={form}
                        groups={groupsQuery.data}
                        emissionFactors={factorsQuery.data}
                        pickerKey={modalSession}
                        onSubmit={onSubmit}
                        onClose={closeModal}
                    />

                    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <RecordCard title="전체 레코드" value={records.length.toString()} desc="등록된 배출 데이터" />
                        <RecordCard title="총 환산 배출량" value={totalEmission.toFixed(2)} desc="kgCO2e (활동량×계수)" highlight />
                        <RecordCard title="Scope1 / Scope2" value={`${scope1Count} / ${scope2Count}`} desc="직접 / 전력 사용" />
                        <RecordCard title="Scope3" value={scope3Count.toString()} desc="기타 간접 배출" dark />
                    </section>

                    <RecordTable
                        records={records}
                        groups={groupsQuery.data}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </>
            )}
        </div>
    );
}
