"use client";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import type { FactorCategoryEmission } from "@/lib/client/types/dashboard";
import { getFactorCategoryLabel } from "@/lib/shared/factorCategoryLabels";

const CATEGORY_COLORS = [
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#8b5cf6",
    "#f97316",
    "#ec4899",
    "#6366f1",
    "#84cc16",
];

type Props = {
    categories: FactorCategoryEmission[];
    unit: string;
};

export default function FactorCategoryPieChart({ categories, unit }: Props) {
    const data = categories.map((item) => ({
        name: getFactorCategoryLabel(item.category),
        value: item.emission,
        category: item.category,
    }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div
            id="FactorCategoryPieChart"
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
            <h4 className="text-xl font-bold text-slate-900">배출 계수 분류별 비중</h4>
            <p className="mt-1 mb-4 text-sm text-slate-500 sm:mb-6">
                활동량 × 배출 계수 기준 환산 배출량 ({unit})
            </p>

            {total === 0 ? (
                <div className="flex h-56 items-center justify-center text-sm text-slate-400 sm:h-72">
                    표시할 배출 데이터가 없습니다.
                </div>
            ) : (
                <div className="h-56 w-full sm:h-72">
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
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.category}
                                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
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
                                    `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit} (${((Number(value) / total) * 100).toFixed(1)}%)`,
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
