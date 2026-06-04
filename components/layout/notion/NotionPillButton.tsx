"use client";

import clsx from "clsx";

type Props = {
    label: string;
    icon: "filter" | "sort";
    active?: boolean;
    open?: boolean;
    badge?: number;
    onClick: () => void;
};

function FilterIcon() {
    return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.5 2.75A.75.75 0 0 1 2.25 2h11.5a.75.75 0 0 1 .53 1.28l-4.25 4.25v4.19a.75.75 0 0 1-1.06.67L6.5 11.19V7.78L2.28 3.53A.75.75 0 0 1 1.5 2.75z" />
        </svg>
    );
}

function SortIcon() {
    return (
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2.75a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 .53 1.28L8.5 7.03v5.72a.75.75 0 0 1-1.5 0V7.03L3.22 3.28A.75.75 0 0 1 3 2.75z" />
        </svg>
    );
}

export default function NotionPillButton({
    label,
    icon,
    active = false,
    open = false,
    badge,
    onClick,
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm transition",
                open || active
                    ? "border-slate-300 bg-slate-100 text-slate-800"
                    : "border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100"
            )}
        >
            {icon === "filter" ? <FilterIcon /> : <SortIcon />}
            <span>{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                    {badge}
                </span>
            )}
        </button>
    );
}
