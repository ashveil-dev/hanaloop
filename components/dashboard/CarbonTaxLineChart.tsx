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
import { calculateCarbonTax } from "@/lib/shared/carbonTax";

type Props = {
    data: MonthlyEmission[];
};

function formatDollar(value: number) {
    return `$${value.toLocaleString()}`;
}

export default function CarbonTaxLineChart({ data }: Props) {
    const chartData = data.map((month) => ({
        ...month,
        carbonTax: calculateCarbonTax(month.total),
    }));

    return (
        <div
            id="CarbonTaxLineChart"
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
            <h4 className="text-xl font-bold text-slate-900">월별 예상 탄소세</h4>
            <p className="mt-1 mb-4 text-sm text-slate-500 sm:mb-6">
                최근 6개월 총 배출량 × 탄소세율 추이
            </p>

            <div className="h-56 w-full sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                            width={72}
                            tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                            formatter={(value) => [formatDollar(Number(value)), "예상 탄소세"]}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                        <Line
                            type="monotone"
                            dataKey="carbonTax"
                            name="예상 탄소세"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ r: 4, fill: "#f59e0b" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
