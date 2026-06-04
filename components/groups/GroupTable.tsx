"use client";

import { useMemo, useState } from "react";
import type { Group } from "@/lib/client/types/groups";
import Pagination from "@/components/layout/Pagination";
import TableDataToolbar from "@/components/layout/TableDataToolbar";
import type { FilterFieldDef } from "@/components/layout/notion/NotionFilterPanel";
import type { SortFieldDef } from "@/components/layout/notion/NotionSortPanel";
import { usePagination } from "@/hooks/usePagination";
import { matchesSearch } from "@/lib/shared/matchesSearch";
import {
    compareDates,
    compareNumbers,
    compareStrings,
    type SortRule,
} from "@/lib/shared/tableSort";

type Props = {
    groups: Group[] | undefined;
    onEdit: (group: Group) => void;
    onDelete: (id: number) => void;
};

const FILTER_FIELDS: FilterFieldDef[] = [
    {
        key: "parentType",
        label: "그룹 유형",
        options: [
            { value: "all", label: "전체" },
            { value: "root", label: "최상위 그룹" },
            { value: "child", label: "하위 그룹" },
        ],
    },
];

const SORT_FIELDS: SortFieldDef[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "그룹명" },
    { key: "createdAt", label: "생성 날짜" },
];

const DEFAULT_SORT: SortRule = { field: "id", direction: "desc" };
const DEFAULT_FILTERS = { parentType: "all" };

export default function GroupTable({ groups, onEdit, onDelete }: Props) {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sort, setSort] = useState<SortRule>(DEFAULT_SORT);

    const getParentName = (parentId: number | null) => {
        if (parentId === null) return "최상위 그룹";
        return groups?.find((group) => group.id === parentId)?.name ?? "알 수 없음";
    };

    const processedGroups = useMemo(() => {
        let list = groups ?? [];

        if (filters.parentType === "root") {
            list = list.filter((group) => group.parentId === null);
        } else if (filters.parentType === "child") {
            list = list.filter((group) => group.parentId !== null);
        }

        list = list.filter((group) => {
            const parentName =
                group.parentId === null
                    ? "최상위 그룹"
                    : groups?.find((item) => item.id === group.parentId)?.name ?? "알 수 없음";

            return matchesSearch(search, group.id, group.name, parentName);
        });

        const direction = sort.direction === "asc" ? 1 : -1;

        return [...list].sort((a, b) => {
            switch (sort.field) {
                case "name":
                    return compareStrings(a.name, b.name) * direction;
                case "createdAt":
                    return compareDates(a.createdAt, b.createdAt) * direction;
                default:
                    return compareNumbers(a.id, b.id) * direction;
            }
        });
    }, [groups, filters, sort, search]);

    const totalCount = groups?.length ?? 0;

    const { page, setPage, resetPage, paginatedItems, totalPages, totalItems, pageSize } =
        usePagination(processedGroups);

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
        <div id="group-list" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h4 className="text-xl font-bold text-slate-900">그룹 목록</h4>
                <p className="mt-1 text-sm text-slate-500">
                    생성된 그룹을 검색·필터·정렬하고 수정하거나 삭제할 수 있습니다.
                </p>
            </div>

            <TableDataToolbar
                filterFields={FILTER_FIELDS}
                filterValues={filters}
                onFilterChange={handleFilterChange}
                onFilterClear={handleFilterClear}
                sortFields={SORT_FIELDS}
                sort={sort}
                onSortChange={handleSortChange}
                onSortReset={handleSortReset}
                filteredCount={processedGroups.length}
                totalCount={totalCount}
                search={search}
                onSearchChange={handleSearchChange}
                accent="cyan"
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-5 py-4 font-medium">ID</th>
                            <th className="px-5 py-4 font-medium">그룹명</th>
                            <th className="px-5 py-4 font-medium">상위 그룹</th>
                            <th className="px-5 py-4 font-medium">생성 날짜</th>
                            <th className="px-5 py-4 text-center font-medium">관리</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {paginatedItems.map((group) => (
                            <tr key={group.id} className="transition hover:bg-slate-50">
                                <td className="px-5 py-4 text-slate-500">{group.id}</td>
                                <td className="max-w-50 px-5 py-4">
                                    <div className="wrap-break-word whitespace-normal font-semibold text-slate-900">
                                        {group.name}
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-slate-500">
                                    {getParentName(group.parentId)}
                                </td>
                                <td className="px-5 py-4 text-slate-500">
                                    {new Date(group.createdAt).toLocaleDateString().slice(0, -1)}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(group)}
                                            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(group.id)}
                                            className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {totalCount === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                    생성된 그룹이 없습니다.
                                </td>
                            </tr>
                        )}

                        {totalCount > 0 && processedGroups.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                    조건에 맞는 그룹이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                accent="cyan"
                onPageChange={setPage}
            />
        </div>
    );
}
