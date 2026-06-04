"use client";

export type FilterFieldDef = {
    key: string;
    label: string;
    options: { value: string; label: string }[];
};

type Props = {
    title?: string;
    fields: FilterFieldDef[];
    values: Record<string, string>;
    onChange: (key: string, value: string) => void;
    onClear: () => void;
};

export default function NotionFilterPanel({
    title = "필터",
    fields,
    values,
    onChange,
    onClear,
}: Props) {
    const activeCount = fields.filter(
        (field) => (values[field.key] ?? "all") !== "all"
    ).length;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <p className="text-xs font-medium text-slate-500">{title}</p>
                {activeCount > 0 && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="cursor-pointer text-xs text-slate-400 transition hover:text-slate-600"
                    >
                        모두 지우기
                    </button>
                )}
            </div>

            <div className="space-y-2">
                {fields.map((field) => (
                    <div
                        key={field.key}
                        className="rounded-md border border-slate-100 bg-slate-50/80 p-2"
                    >
                        <p className="mb-1.5 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            {field.label}
                        </p>
                        <select
                            value={values[field.key] ?? "all"}
                            onChange={(e) => onChange(field.key, e.target.value)}
                            className="w-full cursor-pointer rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-slate-400"
                        >
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            {activeCount === 0 && (
                <p className="px-1 text-xs text-slate-400">
                    조건을 선택하면 목록이 필터링됩니다.
                </p>
            )}
        </div>
    );
}
