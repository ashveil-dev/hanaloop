"use client";

import { useMemo, useState } from "react";
import type { Group } from "@/lib/client/types/groups";
import Pagination from "@/components/layout/Pagination";
import TableSearchBar from "@/components/layout/TableSearchBar";
import { usePagination } from "@/hooks/usePagination";
import { matchesSearch } from "@/lib/shared/matchesSearch";

type Props = {
    groups: Group[] | undefined;
    onEdit: (group: Group) => void;
    onDelete: (id: number) => void;
};

export default function GroupTable({ groups, onEdit, onDelete }: Props) {
    const [search, setSearch] = useState("");

    const getParentName = (parentId: number | null) => {
        if (parentId === null) return "최상위 그룹";
        return groups?.find((group) => group.id === parentId)?.name ?? "알 수 없음";
    };

    const filteredGroups = useMemo(() => {
        const list = groups ?? [];

        return list.filter((group) => {
            const parentName =
                group.parentId === null
                    ? "최상위 그룹"
                    : groups?.find((item) => item.id === group.parentId)?.name ?? "알 수 없음";

            return matchesSearch(search, group.id, group.name, parentName);
        });
    }, [groups, search]);

    const totalCount = groups?.length ?? 0;

    const { page, setPage, resetPage, paginatedItems, totalPages, totalItems, pageSize } =
        usePagination(filteredGroups);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        resetPage();
    };

    return (
        <div id="group-list" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h4 className="text-xl font-bold text-slate-900">그룹 목록</h4>
                <p className="mt-1 text-sm text-slate-500">
                    생성된 그룹을 검색하고 수정하거나 삭제할 수 있습니다.
                </p>
            </div>

            <TableSearchBar
                value={search}
                onChange={handleSearchChange}
                placeholder="그룹명, ID, 상위 그룹 검색"
                accent="cyan"
                filteredCount={filteredGroups.length}
                totalCount={totalCount}
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

                        {totalCount > 0 && filteredGroups.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                    검색 결과가 없습니다.
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
