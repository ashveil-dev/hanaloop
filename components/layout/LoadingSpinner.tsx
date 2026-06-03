import clsx from "clsx";

type Accent = "emerald" | "cyan" | "teal" | "amber";

const accentStyles: Record<Accent, string> = {
    emerald: "border-emerald-500 text-emerald-600",
    cyan: "border-cyan-500 text-cyan-600",
    teal: "border-teal-500 text-teal-600",
    amber: "border-amber-500 text-amber-600",
};

type Props = {
    label?: string;
    accent?: Accent;
    className?: string;
};

export default function LoadingSpinner({
    label = "데이터를 불러오는 중...",
    accent = "emerald",
    className,
}: Props) {
    return (
        <div className={clsx("flex flex-col items-center justify-center gap-4 py-16", className)}>
            <div
                className={clsx(
                    "h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-current",
                    accentStyles[accent]
                )}
                role="status"
                aria-label={label}
            />
            <p className="text-sm font-medium text-slate-500">{label}</p>
        </div>
    );
}
