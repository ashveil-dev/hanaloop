"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { getEmissionRecords } from "@/lib/client/api/getEmissionRecords";
import { createEmissionRecord } from "@/lib/client/api/createEmissionRecord";
import { deleteEmissionRecord } from "@/lib/client/api/deleteEmissionRecord";
import { editEmissionRecord } from "@/lib/client/api/editEmissionRecord";
import { getGroups } from "@/lib/client/api/getGroups";
import type { EmissionRecord } from "@/lib/client/types/emissionRecords";

import RecordHeader from "@/components/records/RecordHeader";
import RecordCard from "@/components/records/RecordCard";
import RecordForm from "@/components/records/RecordForm";
import RecordTable from "@/components/records/RecordTable";

const FormSchema = z.object({
    id: z.number(),
    groupId: z.number(),
    scopeType: z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]),
    amount: z.number(),
    unit: z.string(),
    recordedAt: z.string(),
});

export type RecordFormType = z.infer<typeof FormSchema>;

export default function RecordMain() {
    const [isEdit, setIsEdit] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const recordsQuery = useQuery({
        queryKey: ["emission-records"],
        queryFn: getEmissionRecords,
    });

    const groupsQuery = useQuery({
        queryKey: ["Groups"],
        queryFn: getGroups,
    });

    const form = useForm<RecordFormType>({
        resolver: zodResolver(FormSchema),
    });

    const records = recordsQuery.data ?? [];

    const totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
    const scope1Count = records.filter((record) => record.scopeType === "SCOPE1").length;
    const scope2Count = records.filter((record) => record.scopeType === "SCOPE2").length;
    const scope3Count = records.filter((record) => record.scopeType === "SCOPE3").length;

    const onSubmit: SubmitHandler<RecordFormType> = async (data) => {
        try {
            const { id, groupId, scopeType, amount, unit, recordedAt } = data;

            if (isEdit) {
                await editEmissionRecord({
                    id,
                    groupId,
                    scopeType,
                    amount,
                    unit,
                    recordedAt,
                });

                setIsEdit(false);
            } else {
                await createEmissionRecord({
                    groupId,
                    scopeType,
                    amount,
                    unit,
                    recordedAt,
                });
            }

            recordsQuery.refetch();
            form.reset();
        } catch (e) {
            alert("Error");
            console.log(e);
        }
    };

    const onRefresh = () => {
        recordsQuery.refetch();
    };

    const onEdit = (record: EmissionRecord) => {
        form.setValues({
            ...record,
            amount: parseFloat(record.amount),
        });

        setIsEdit(true);
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const onDelete = async (id: number) => {
        try {
            await deleteEmissionRecord({ id });
            recordsQuery.refetch();
        } catch (e) {
            alert("Error");
            console.log(e);
        }
    };

    const onCancel = () => {
        setIsEdit(false);
        form.reset();
    };

    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
            <RecordHeader onRefresh={onRefresh} />

            <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <RecordCard title="전체 레코드" value={records.length.toString()} desc="등록된 배출 데이터" />
                <RecordCard title="총 배출량" value={totalAmount.toFixed(2)} desc="tCO2e 기준" highlight />
                <RecordCard title="Scope1 / Scope2" value={`${scope1Count} / ${scope2Count}`} desc="직접 / 전력 사용" />
                <RecordCard title="Scope3" value={scope3Count.toString()} desc="기타 간접 배출" dark />
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <RecordForm
                    ref={formRef}
                    form={form}
                    isEdit={isEdit}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />

                <RecordTable
                    records={records}
                    groups={groupsQuery.data}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </section>
        </div>
    );
}