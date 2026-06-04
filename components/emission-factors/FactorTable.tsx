"use client";

import { useMemo, useState } from "react";
import type { EmissionFactor } from "@/lib/client/types/emissionFactors";
import Pagination from "@/components/layout/Pagination";
import MobileListCard from "@/components/layout/MobileListCard";
import TableDataToolbar from "@/components/layout/TableDataToolbar";
import type { FilterFieldDef } from "@/components/layout/notion/NotionFilterPanel";
import type { SortFieldDef } from "@/components/layout/notion/NotionSortPanel";
import { usePagination } from "@/hooks/usePagination";
import { getFactorCategoryLabel } from "@/lib/shared/factorCategoryLabels";
import { matchesSearch } from "@/lib/shared/matchesSearch";
import {
    compareNumbers,
    compareStrings,
    type SortRule,
} from "@/lib/shared/tableSort";

type Props = {
    factors: EmissionFactor[];
    onEdit: (factor: EmissionFactor) => void;
    onDelete: (id: number) => void;
};

const SORT_FIELDS: SortFieldDef[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "이름" },
    { key: "category", label: "분류" },
    { key: "factor", label: "배출 계수" },
];

const DEFAULT_SORT: SortRule = { field: "id", direction: "desc" };
const DEFAULT_FILTERS = { category: "all" };

export default function FactorTable({ factors, onEdit, onDelete }: Props) {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sort, setSort] = useState<SortRule>(DEFAULT_SORT);

    const filterFields = useMemo<FilterFieldDef[]>(() => {
        const categories = [...new Set(factors.map((factor) => factor.category))].sort();

        return [
            {
                key: "category",
                label: "분류",
                options: [
                    { value: "all", label: "전체" },
                    ...categories.map((category) => ({
                        value: category,
                        label: getFactorCategoryLabel(category),
                    })),
                ],
            },
        ];
    }, [factors]);

    const processedFactors = useMemo(() => {
        let list = factors;

        if (filters.category !== "all") {
            list = list.filter((factor) => factor.category === filters.category);
        }

        list = list.filter((factor) =>
            matchesSearch(
                search,
                factor.id,
                factor.name,
                factor.category,
                getFactorCategoryLabel(factor.category),
                factor.factor,
                factor.inputUnit,
                factor.outputUnit,
                factor.description
            )
        );

        const direction = sort.direction === "asc" ? 1 : -1;

        return [...list].sort((a, b) => {
            switch (sort.field) {
                case "name":
                    return compareStrings(a.name, b.name) * direction;
                case "category":
                    return compareStrings(a.category, b.category) * direction;
                case "factor":
                    return compareNumbers(Number(a.factor), Number(b.factor)) * direction;
                default:
                    return compareNumbers(a.id, b.id) * direction;
            }
        });
    }, [factors, filters, sort, search]);

    const { page, setPage, resetPage, paginatedItems, totalPages, totalItems, pageSize } =
        usePagination(processedFactors);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        resetPage();
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        resetPage();
    };

    const handleFilterClear = () => {
        setFilters(DEFAULT_FILTERS);
        resetPage();
    };

    const handleSortChange = (nextSort: SortRule) => {
        setSort(nextSort);
        resetPage();
    };

    const handleSortReset = () => {
        setSort(DEFAULT_SORT);
        resetPage();
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h4 className="text-lg font-bold text-slate-900 sm:text-2xl">배출 계수 목록</h4>
            <p className="mt-2 text-sm text-slate-500">
                활동량 × 배출 계수 = 환산 배출량({factors[0]?.outputUnit ?? "kgCO2e"})
            </p>

            <div className="mt-4">
                <TableDataToolbar
                    filterFields={filterFields}
                    filterValues={filters}
                    onFilterChange={handleFilterChange}
                    onFilterClear={handleFilterClear}
                    sortFields={SORT_FIELDS}
                    sort={sort}
                    onSortChange={handleSortChange}
                    onSortReset={handleSortReset}
                    filteredCount={processedFactors.length}
                    totalCount={factors.length}
                    search={search}
                    onSearchChange={handleSearchChange}
                    accent="amber"
                />
            </div>

            {factors.length === 0 && (
                <div className="py-10 text-center text-slate-400">등록된 배출 계수가 없습니다.</div>
            )}

            {factors.length > 0 && processedFactors.length === 0 && (
                <div className="py-10 text-center text-slate-400">조건에 맞는 배출 계수가 없습니다.</div>
            )}

            {processedFactors.length > 0 && (
                <>
                    <div className="space-y-3 md:hidden">
                        {paginatedItems.map((factor) => (
                            <MobileListCard key={factor.id}>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold text-slate-900">{factor.name}</p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {getFactorCategoryLabel(factor.category)} · ID {factor.id}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 text-sm">
                                        <span className="font-semibold text-amber-700">
                                            {Number(factor.factor).toLocaleString()}
                                        </span>
                                        <span className="text-slate-500">
                                            {factor.outputUnit} / {factor.inputUnit}
                                        </span>
                                    </div>
                                    {factor.description && (
                                        <p className="text-xs text-slate-500">{factor.description}</p>
                                    )}
                                    <div className="flex justify-end gap-2 border-t border-slate-200/80 pt-3">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(factor)}
                                            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(factor.id)}
                                            className="cursor-pointer rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </MobileListCard>
                        ))}
                    </div>

                    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left text-sm lg:min-w-[800px]">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="hidden px-5 py-4 text-center font-medium lg:table-cell">ID</th>
                                        <th className="px-5 py-4 text-center font-medium">이름</th>
                                        <th className="px-5 py-4 text-center font-medium">분류</th>
                                        <th className="px-5 py-4 text-center font-medium">배출 계수</th>
                                        <th className="hidden px-5 py-4 text-center font-medium xl:table-cell">단위</th>
                                        <th className="hidden px-5 py-4 text-center font-medium lg:table-cell">설명</th>
                                        <th className="px-5 py-4 text-center font-medium">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paginatedItems.map((factor) => (
                                        <tr key={factor.id} className="text-center">
                                            <td className="hidden px-5 py-4 text-slate-500 lg:table-cell">{factor.id}</td>
                                            <td className="px-5 py-4 font-semibold text-slate-900">
                                                {factor.name}
                                            </td>
                                            <td className="px-5 py-4 text-slate-600">
                                                {getFactorCategoryLabel(factor.category)}
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-amber-700">
                                                {Number(factor.factor).toLocaleString()}
                                            </td>
                                            <td className="hidden px-5 py-4 text-slate-600 xl:table-cell">
                                                {factor.outputUnit} / {factor.inputUnit}
                                            </td>
                                            <td className="hidden px-5 py-4 text-slate-500 lg:table-cell">
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

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
