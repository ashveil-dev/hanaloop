"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmissionRecords } from "@/lib/client/api/getEmissionRecords";
import { createEmissionRecord } from "@/lib/client/api/createEmissionRecord";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";

type ScopeType = "SCOPE1" | "SCOPE2" | "SCOPE3";

const sections = [
    {
        title: "레코드 생성",
        description: "",
        href: "#CreateRecord",
    },
    {
        title: "레코드 목록",
        description: "",
        href: "#RecordList",
    },
];

export default function RecordsPage() {
    const recordsData = useQuery({
        queryKey: ["emission-records"],
        queryFn: getEmissionRecords
    })
    const editId = undefined
    const [groupId, setGroupId] = useState("");
    const [scopeType, setScopeType] = useState<ScopeType>("SCOPE1");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState("tCO2e");
    const [recordedAt, setRecordedAt] = useState("");
    const records = recordsData.data ?? []

    const totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
    const scope1Count = records.filter((record) => record.scopeType === "SCOPE1").length;
    const scope2Count = records.filter((record) => record.scopeType === "SCOPE2").length;
    const scope3Count = records.filter((record) => record.scopeType === "SCOPE3").length;

    const onFormSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        try {
            const _groupId = parseInt(groupId)
            const _amount = parseInt(amount)

            e.preventDefault()
            if (Number.isNaN(_groupId) || Number.isNaN(_amount))
                throw "invalid input"

            const result = await createEmissionRecord({
                groupId: _groupId,
                scopeType,
                amount: _amount,
                unit,
                recordedAt
            })
        } catch (e) {
            alert("Error")
            console.log(e);
        }
    }

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden">
            <AppHeader />

            <main className="flex min-h-0 flex-1 overflow-hidden">
                <AppSidebar sections={sections} />

                <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
                    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-medium text-emerald-600">
                                Emission Records Management
                            </p>
                            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                배출 레코드 관리
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                조직별 탄소 배출 데이터를 생성, 조회, 수정, 삭제할 수 있습니다.
                            </p>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >
                            레코드 새로고침
                        </button>
                    </header>

                    <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-slate-500">전체 레코드</p>
                            <h4 className="mt-3 text-3xl font-bold text-slate-900">
                                {records.length}
                            </h4>
                            <p className="mt-3 text-sm text-slate-500">등록된 배출 데이터</p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-slate-500">총 배출량</p>
                            <h4 className="mt-3 text-3xl font-bold text-slate-900">
                                {totalAmount.toFixed(2)}
                            </h4>
                            <p className="mt-3 text-sm text-emerald-600">tCO2e 기준</p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm text-slate-500">Scope1 / Scope2</p>
                            <h4 className="mt-3 text-3xl font-bold text-slate-900">
                                {scope1Count} / {scope2Count}
                            </h4>
                            <p className="mt-3 text-sm text-slate-500">직접 / 전력 사용</p>
                        </div>

                        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
                            <p className="text-sm text-slate-400">Scope3</p>
                            <h4 className="mt-3 text-3xl font-bold">{scope3Count}</h4>
                            <p className="mt-3 text-sm text-emerald-400">기타 간접 배출</p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <form
                            id="CreateRecord"
                            onSubmit={onFormSubmit}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <p className="text-sm font-medium text-emerald-600">
                                {editId ? "Update Record" : "Create Record"}
                            </p>
                            <h4 className="mt-2 text-2xl font-bold text-slate-900">
                                {editId ? "레코드 수정" : "레코드 생성"}
                            </h4>

                            <div className="mt-6 space-y-5">
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">
                                        그룹 ID
                                    </span>
                                    <input
                                        value={groupId}
                                        type="number"
                                        placeholder="예: 1"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">
                                        Scope 타입
                                    </span>
                                    <select
                                        value={scopeType}
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                                    >
                                        <option value="SCOPE1">SCOPE1</option>
                                        <option value="SCOPE2">SCOPE2</option>
                                        <option value="SCOPE3">SCOPE3</option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">
                                        배출량
                                    </span>
                                    <input
                                        value={amount}
                                        type="number"
                                        step="0.01"
                                        placeholder="예: 1200.50"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">
                                        단위
                                    </span>
                                    <input
                                        value={unit}
                                        placeholder="tCO2e"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">
                                        기록일
                                    </span>
                                    <input
                                        value={recordedAt}
                                        type="date"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                                    />
                                </label>

                                <div className="flex gap-3">
                                    <button
                                        className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        {editId ? "수정하기" : "생성하기"}
                                    </button>

                                    {editId && (
                                        <button
                                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            취소
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>

                        <div
                            id="RecordList"
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2"
                        >
                            <h4 className="text-2xl font-bold text-slate-900">
                                레코드 목록
                            </h4>
                            <p className="mt-2 text-sm text-slate-500">
                                생성된 배출 레코드를 수정하거나 삭제할 수 있습니다.
                            </p>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[920px] text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-500">
                                            <tr>
                                                <th className="px-5 py-4 font-medium">ID</th>
                                                <th className="px-5 py-4 font-medium">Group ID</th>
                                                <th className="px-5 py-4 font-medium">Scope</th>
                                                <th className="px-5 py-4 font-medium">Amount</th>
                                                <th className="px-5 py-4 font-medium">Unit</th>
                                                <th className="px-5 py-4 font-medium">Recorded At</th>
                                                <th className="px-5 py-4 font-medium">Created At</th>
                                                <th className="px-5 py-4 text-right font-medium">관리</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100">
                                            {records.map((record) => (
                                                <tr key={record.id} className="bg-white">
                                                    <td className="px-5 py-4 text-slate-500">
                                                        #{record.id}
                                                    </td>
                                                    <td className="px-5 py-4 font-semibold text-slate-900">
                                                        {record.groupId}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                            {record.scopeType}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4 font-semibold text-slate-900">
                                                        {record.amount}
                                                    </td>
                                                    <td className="px-5 py-4 text-slate-500">
                                                        {record.unit}
                                                    </td>
                                                    <td className="px-5 py-4 text-slate-500">
                                                        {record.recordedAt}
                                                    </td>
                                                    <td className="px-5 py-4 text-slate-500">
                                                        {record.createdAt.toString()}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                // onClick={() => onEdit(record)}
                                                                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                                            >
                                                                수정
                                                            </button>
                                                            <button
                                                                className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100"
                                                            >
                                                                삭제
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {records.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan={8}
                                                        className="px-5 py-10 text-center text-slate-400"
                                                    >
                                                        등록된 배출 레코드가 없습니다.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}