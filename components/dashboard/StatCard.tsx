type StatCardProps = {
    label: string;
    value: string | number;
    unit?: string;
    description: string;
    descriptionColor?: string;
    dark?: boolean;
};

export default function StatCard({
    label,
    value,
    unit,
    description,
    descriptionColor = "text-slate-500",
    dark = false,
}: StatCardProps) {
    return (
        <div
            className={`rounded-3xl border p-6 shadow-sm ${dark
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
        >
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                {label}
            </p>

            <h4 className={`mt-3 text-3xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>
                {value}
                {unit && (
                    <span className="ml-2 text-sm font-medium text-slate-400">
                        {unit}
                    </span>
                )}
            </h4>

            <p className={`mt-4 text-sm ${descriptionColor}`}>
                {description}
            </p>
        </div>
    );
}