"use client";

import clsx from "clsx";
import type { SortDirection, SortRule } from "@/lib/shared/tableSort";

export type SortFieldDef = {
    key: string;
    label: string;
};

type Props = {
    title?: string;
    fields: SortFieldDef[];
    sort: SortRule;
    onChange: (sort: SortRule) => void;
    onReset: () => void;
};

export default function NotionSortPanel({
    title = "정렬",
    fields,
    sort,
    onChange,
    onReset,
}: Props) {
    const isDefault = sort.field === fields[0]?.key && sort.direction === "desc";

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <p className="text-xs font-medium text-slate-500">{title}</p>
                {!isDefault && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="cursor-pointer text-xs text-slate-400 transition hover:text-slate-600"
                    >
                        초기화
                    </button>
                )}
            </div>

            <div className="space-y-1">
                <p className="px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    정렬 기준
                </p>
                {fields.map((field) => (
                    <button
                        key={field.key}
                        type="button"
                        onClick={() => onChange({ ...sort, field: field.key })}
                        className={clsx(
                            "flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition",
                            sort.field === field.key
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        <span>{field.label}</span>
                        {sort.field === field.key && (
                            <span className="text-xs text-slate-400">선택됨</span>
                        )}
                    </button>
                ))}
            </div>

            <div className="space-y-1.5 border-t border-slate-100 pt-3">
                <p className="px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    방향
                </p>
                <div className="grid grid-cols-2 gap-1 rounded-md bg-slate-100 p-1">
                    {(
                        [
                            { value: "asc", label: "오름차순" },
                            { value: "desc", label: "내림차순" },
                        ] as const
                    ).map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                                onChange({ ...sort, direction: option.value as SortDirection })
                            }
                            className={clsx(
                                "cursor-pointer rounded px-2 py-1.5 text-xs font-medium transition",
                                sort.direction === option.value
                                    ? "bg-white text-slate-800 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
