"use client";

import clsx from "clsx";

type Accent = "cyan" | "teal" | "amber";

const accentStyles: Record<Accent, string> = {
    cyan: "focus:border-cyan-300 focus:ring-cyan-100",
    teal: "focus:border-teal-300 focus:ring-teal-100",
    amber: "focus:border-amber-300 focus:ring-amber-100",
};

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    accent?: Accent;
    variant?: "full" | "toolbar";
    filteredCount?: number;
    totalCount?: number;
};

export default function TableSearchBar({
    value,
    onChange,
    placeholder = "검색하기",
    accent = "cyan",
    variant = "full",
    filteredCount,
    totalCount,
}: Props) {
    const isSearching = value.trim().length > 0;

    const input = (
        <div className="relative">
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={clsx(
                    "outline-none transition focus:ring-2",
                    variant === "toolbar"
                        ? "w-full min-w-[200px] max-w-[280px] rounded-md border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-sm text-slate-700 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white"
                        : "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-4",
                    accentStyles[accent]
                )}
            />
            <svg
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
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
    );

    if (variant === "toolbar") {
        return input;
    }

    return (
        <div className="mb-4 space-y-2">
            {input}
            {filteredCount !== undefined && totalCount !== undefined && (
                <p className="text-xs text-slate-500">
                    {isSearching ? (
                        <>
                            검색 결과{" "}
                            <span className="font-semibold text-slate-700">{filteredCount}</span>
                            건 / 전체 {totalCount}건
                        </>
                    ) : (
                        <>전체 {totalCount}건</>
                    )}
                </p>
            )}
        </div>
    );
}
