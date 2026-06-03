"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { Hierarchy } from "@/lib/client/types/dashboard";
import { getTopGroupsByEmission } from "@/lib/shared/flattenHierarchy";

type Props = {
    hierarchy: Hierarchy;
    unit: string;
    limit?: number;
};

export default function TopGroupsBarChart({ hierarchy, unit, limit = 8 }: Props) {
    const topGroups = getTopGroupsByEmission(hierarchy, limit).map((group) => ({
        name: group.name.length > 12 ? `${group.name.slice(0, 12)}…` : group.name,
        fullName: group.name,
        total: group.totalEmission.total,
    }));

    return (
        <div
            id="TopGroupsBarChart"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h4 className="text-xl font-bold text-slate-900">지사·공장 Top {limit}</h4>
            <p className="mt-1 mb-6 text-sm text-slate-500">
                조직별 총 배출량 상위 ({unit})
            </p>

            {topGroups.length === 0 ? (
                <div className="flex h-72 items-center justify-center text-sm text-slate-400">
                    표시할 조직 데이터가 없습니다.
                </div>
            ) : (
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={topGroups}
                            layout="vertical"
                            margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                            <XAxis
                                type="number"
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={96}
                                tick={{ fill: "#64748b", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                                formatter={(value) => [
                                    `${Number(value).toLocaleString()} ${unit}`,
                                    "총 배출량",
                                ]}
                                labelFormatter={(_, payload) =>
                                    payload?.[0]?.payload?.fullName ?? ""
                                }
                            />
                            <Bar dataKey="total" fill="#10b981" radius={[0, 8, 8, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
