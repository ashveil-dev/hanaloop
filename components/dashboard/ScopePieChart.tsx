"use client";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const SCOPE_COLORS = {
    scope1: "#10b981",
    scope2: "#14b8a6",
    scope3: "#22d3ee",
};

type Props = {
    scope1: number;
    scope2: number;
    scope3: number;
    unit: string;
};

export default function ScopePieChart({ scope1, scope2, scope3, unit }: Props) {
    const data = [
        { name: "Scope1 (직접)", value: scope1, key: "scope1" },
        { name: "Scope2 (전력)", value: scope2, key: "scope2" },
        { name: "Scope3 (간접)", value: scope3, key: "scope3" },
    ].filter((item) => item.value > 0);

    const total = scope1 + scope2 + scope3;

    return (
        <div
            id="ScopePieChart"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h4 className="text-xl font-bold text-slate-900">Scope별 배출 비중</h4>
            <p className="mt-1 mb-6 text-sm text-slate-500">
                직접 / 전력 / 간접 배출 구성 ({unit})
            </p>

            {total === 0 ? (
                <div className="flex h-72 items-center justify-center text-sm text-slate-400">
                    표시할 배출 데이터가 없습니다.
                </div>
            ) : (
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                            >
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.key}
                                        fill={SCOPE_COLORS[entry.key as keyof typeof SCOPE_COLORS]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                                formatter={(value, name) => [
                                    `${Number(value).toLocaleString()} ${unit} (${((Number(value) / total) * 100).toFixed(1)}%)`,
                                    name,
                                ]}
                            />
                            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
