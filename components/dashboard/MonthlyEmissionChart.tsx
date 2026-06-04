"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { MonthlyEmission } from "@/lib/client/types/dashboard";

type Props = {
    data: MonthlyEmission[];
    unit: string;
};

export default function MonthlyEmissionChart({ data, unit }: Props) {
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const changePercent =
        previous && previous.total > 0
            ? (((latest.total - previous.total) / previous.total) * 100).toFixed(1)
            : null;

    return (
        <div
            id="MonthlyEmissionChart"
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
            <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h4 className="text-xl font-bold text-slate-900">
                        월별 탄소 배출량
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                        최근 6개월 Scope별 배출량 추이 ({unit})
                    </p>
                </div>

                {changePercent !== null && (
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            Number(changePercent) <= 0
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                        }`}
                    >
                        {Number(changePercent) <= 0 ? "" : "+"}
                        {changePercent}%
                    </span>
                )}
            </div>

            <div className="h-56 w-full sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                            width={40}
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
                        <Legend
                            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                        />
                        <Bar
                            dataKey="scope1"
                            name="Scope1"
                            stackId="emission"
                            fill="#10b981"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="scope2"
                            name="Scope2"
                            stackId="emission"
                            fill="#14b8a6"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="scope3"
                            name="Scope3"
                            stackId="emission"
                            fill="#22d3ee"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
