"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import type { Group } from "@/lib/client/types/groups";

type Accent = "cyan" | "teal";

const accentStyles: Record<
    Accent,
    { focus: string; selected: string; hover: string }
> = {
    cyan: {
        focus: "focus:border-cyan-300 focus:ring-cyan-100",
        selected: "border-cyan-300 bg-cyan-50 ring-2 ring-cyan-100",
        hover: "hover:border-cyan-200",
    },
    teal: {
        focus: "focus:border-teal-300 focus:ring-teal-100",
        selected: "border-teal-300 bg-teal-50 ring-2 ring-teal-100",
        hover: "hover:border-teal-200",
    },
};

type Props = {
    title: string;
    description: string;
    groups: Group[] | undefined;
    selectedId?: number | null;
    excludeId?: number;
    allowNone?: boolean;
    accent?: Accent;
    onSelect: (group: Group | null) => void;
};

export default function GroupListPicker({
    title,
    description,
    groups,
    selectedId,
    excludeId,
    allowNone = false,
    accent = "cyan",
    onSelect,
}: Props) {
    const styles = accentStyles[accent];
    const [query, setQuery] = useState("");

    const availableGroups = useMemo(() => {
        if (!groups) return [];
        return groups.filter((group) => group.id !== excludeId);
    }, [groups, excludeId]);

    const filteredGroups = useMemo(() => {
        const keyword = query.trim().toLowerCase();
        if (!keyword) return availableGroups;

        return availableGroups.filter(
            (group) =>
                group.name.toLowerCase().includes(keyword) ||
                String(group.id).includes(keyword)
        );
    }, [availableGroups, query]);

    const getParentLabel = (parentId: number | null) => {
        if (parentId === null) return "최상위 그룹";
        return groups?.find((g) => g.id === parentId)?.name ?? `ID ${parentId}`;
    };

    const isNoneSelected = selectedId === null || selectedId === undefined;

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="shrink-0">
                <h5 className="text-sm font-semibold text-slate-900">{title}</h5>
                <p className="mt-1 text-xs text-slate-500">{description}</p>
            </div>

            <div className="relative mt-3 shrink-0">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="그룹 검색..."
                    className={clsx(
                        "w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-4",
                        styles.focus
                    )}
                />
                <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                </svg>
            </div>

            <ul className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain pr-1 [-webkit-overflow-scrolling:touch]">
                {allowNone && (
                    <li>
                        <button
                            type="button"
                            onClick={() => onSelect(null)}
                            className={clsx(
                                "w-full cursor-pointer rounded-2xl border p-3 text-left transition",
                                isNoneSelected
                                    ? styles.selected
                                    : clsx("border-slate-200 bg-white hover:bg-slate-50", styles.hover)
                            )}
                        >
                            <p className="font-semibold text-slate-900">없음</p>
                            <p className="mt-1 text-xs text-slate-500">최상위 그룹으로 생성</p>
                        </button>
                    </li>
                )}

                {filteredGroups.map((group) => {
                    const isSelected = selectedId === group.id;

                    return (
                        <li key={group.id}>
                            <button
                                type="button"
                                onClick={() => onSelect(group)}
                                className={clsx(
                                    "w-full cursor-pointer rounded-2xl border p-3 text-left transition",
                                    isSelected
                                        ? styles.selected
                                        : clsx("border-slate-200 bg-white hover:bg-slate-50", styles.hover)
                                )}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-slate-900">
                                            {group.name}
                                        </p>
                                        <p className="mt-1 truncate text-xs text-slate-500">
                                            {getParentLabel(group.parentId)}
                                        </p>
                                    </div>
                                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                        #{group.id}
                                    </span>
                                </div>
                            </button>
                        </li>
                    );
                })}

                {groups && filteredGroups.length === 0 && !allowNone && (
                    <li className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
                        검색 결과가 없습니다
                    </li>
                )}

                {groups && filteredGroups.length === 0 && allowNone && query.trim() !== "" && (
                    <li className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
                        검색 결과가 없습니다
                    </li>
                )}

                {!groups && (
                    <li className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
                        그룹 목록을 불러오는 중...
                    </li>
                )}
            </ul>
        </div>
    );
}
