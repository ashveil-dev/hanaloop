"use client";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { MonthlyEmission } from "@/lib/client/types/dashboard";

const SCOPE_LINES = [
    { key: "scope1", name: "Scope1", color: "#10b981" },
    { key: "scope2", name: "Scope2", color: "#14b8a6" },
    { key: "scope3", name: "Scope3", color: "#22d3ee" },
] as const;

type Props = {
    data: MonthlyEmission[];
    unit: string;
};

export default function ScopeTrendLineChart({ data, unit }: Props) {
    return (
        <div
            id="ScopeTrendLineChart"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h4 className="text-xl font-bold text-slate-900">Scope별 배출 추이</h4>
            <p className="mt-1 mb-6 text-sm text-slate-500">
                최근 6개월 Scope1 / 2 / 3 라인 추이 ({unit})
            </p>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            width={48}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                            formatter={(value, name) => [
                                `${Number(value).toLocaleString()} ${unit}`,
                                name,
                            ]}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                        {SCOPE_LINES.map((line) => (
                            <Line
                                key={line.key}
                                type="monotone"
                                dataKey={line.key}
                                name={line.name}
                                stroke={line.color}
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
