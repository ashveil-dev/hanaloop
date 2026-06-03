"use client";

import clsx from "clsx";
import { getPageRange } from "@/lib/shared/pagination";

type Accent = "cyan" | "teal" | "amber";

const accentStyles: Record<
    Accent,
    { active: string; button: string; text: string }
> = {
    cyan: {
        active: "bg-cyan-600 text-white border-cyan-600",
        button: "hover:bg-cyan-50 hover:border-cyan-200 hover:text-cyan-700",
        text: "text-cyan-700",
    },
    teal: {
        active: "bg-teal-600 text-white border-teal-600",
        button: "hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700",
        text: "text-teal-700",
    },
    amber: {
        active: "bg-amber-600 text-white border-amber-600",
        button: "hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700",
        text: "text-amber-700",
    },
};

type Props = {
    page: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    accent?: Accent;
    onPageChange: (page: number) => void;
};

function getVisiblePages(page: number, totalPages: number): number[] {
    const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
    return [...pages]
        .filter((p) => p >= 1 && p <= totalPages)
        .sort((a, b) => a - b);
}

export default function Pagination({
    page,
    totalPages,
    totalItems,
    pageSize,
    accent = "cyan",
    onPageChange,
}: Props) {
    const styles = accentStyles[accent];
    const { start, end } = getPageRange(page, pageSize, totalItems);
    const visiblePages = getVisiblePages(page, totalPages);

    if (totalItems === 0) return null;

    return (
        <div className="mt-4 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
                전체{" "}
                <span className={clsx("font-semibold", styles.text)}>
                    {totalItems}
                </span>
                건 중{" "}
                <span className="font-semibold text-slate-700">
                    {start}-{end}
                </span>
                건 표시
            </p>

            <div className="flex flex-wrap items-center gap-1">
                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className={clsx(
                        "cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40",
                        styles.button
                    )}
                >
                    이전
                </button>

                {visiblePages.map((pageNumber, index) => {
                    const prev = visiblePages[index - 1];
                    const showEllipsis = prev !== undefined && pageNumber - prev > 1;

                    return (
                        <span key={pageNumber} className="flex items-center gap-1">
                            {showEllipsis && (
                                <span className="px-1 text-sm text-slate-400">…</span>
                            )}
                            <button
                                type="button"
                                onClick={() => onPageChange(pageNumber)}
                                className={clsx(
                                    "min-w-9 cursor-pointer rounded-xl border px-3 py-2 text-sm font-semibold transition",
                                    pageNumber === page
                                        ? styles.active
                                        : clsx(
                                              "border-slate-200 bg-white text-slate-600",
                                              styles.button
                                          )
                                )}
                            >
                                {pageNumber}
                            </button>
                        </span>
                    );
                })}

                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className={clsx(
                        "cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40",
                        styles.button
                    )}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
