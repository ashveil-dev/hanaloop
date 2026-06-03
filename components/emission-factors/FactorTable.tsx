"use client";

import type { EmissionFactor } from "@/lib/client/types/emissionFactors";
import Pagination from "@/components/layout/Pagination";
import { usePagination } from "@/hooks/usePagination";

type Props = {
    factors: EmissionFactor[];
    onEdit: (factor: EmissionFactor) => void;
    onDelete: (id: number) => void;
};

export default function FactorTable({ factors, onEdit, onDelete }: Props) {
    const { page, setPage, paginatedItems, totalPages, totalItems, pageSize } =
        usePagination(factors);

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-2xl font-bold text-slate-900">배출 계수 목록</h4>
            <p className="mt-2 text-sm text-slate-500">
                활동량 × 배출 계수 = 환산 배출량({factors[0]?.outputUnit ?? "kgCO2e"})
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-5 py-4 text-center font-medium">ID</th>
                                <th className="px-5 py-4 text-center font-medium">이름</th>
                                <th className="px-5 py-4 text-center font-medium">분류</th>
                                <th className="px-5 py-4 text-center font-medium">배출 계수</th>
                                <th className="px-5 py-4 text-center font-medium">단위</th>
                                <th className="px-5 py-4 text-center font-medium">설명</th>
                                <th className="px-5 py-4 text-center font-medium">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedItems.map((factor) => (
                                <tr key={factor.id} className="text-center">
                                    <td className="px-5 py-4 text-slate-500">{factor.id}</td>
                                    <td className="px-5 py-4 font-semibold text-slate-900">
                                        {factor.name}
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">{factor.category}</td>
                                    <td className="px-5 py-4 font-semibold text-amber-700">
                                        {Number(factor.factor).toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">
                                        {factor.outputUnit} / {factor.inputUnit}
                                    </td>
                                    <td className="px-5 py-4 text-slate-500">
                                        {factor.description ?? "-"}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(factor)}
                                                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                            >
                                                수정
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(factor.id)}
                                                className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {factors.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                                        등록된 배출 계수가 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                accent="amber"
                onPageChange={setPage}
            />
        </div>
    );
}
