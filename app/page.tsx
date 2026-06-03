"use client"
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import StatCard from "@/components/dashboard/StatCard";
import MonthlyEmissionChart from "@/components/dashboard/MonthlyEmissionChart";
import ScopeBreakdownCard from "@/components/dashboard/ScopeBreakdownCard";
import HierarchyEmissionCard from "@/components/dashboard/HierarchyEmissionCard";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { getDashboardSummary } from "@/lib/client/api/getDashboardSummary";
import { getMonthlyEmissions } from "@/lib/client/api/getMonthlyEmissions";
import { getGroups } from "@/lib/client/api/getGroups";
import { getHierarchy } from "@/lib/client/api/getHierarchy";

function formatDollar(value: number) {
    return `$${value.toLocaleString()}`;
}

export default function DashboardMain() {
    const summaryData = useQuery({
        queryKey: ["getSummary"],
        queryFn: getDashboardSummary,
    })

    const groupsData = useQuery({
        queryKey: ["getGroups"],
        queryFn: getGroups,
    })

    const hierarchyData = useQuery({
        queryKey: ["getGierarchy"],
        queryFn: () => getHierarchy({
            id: 1
        }),
    })

    const monthlyData = useQuery({
        queryKey: ["getMonthlyEmissions"],
        queryFn: getMonthlyEmissions,
    })

    const isLoading =
        summaryData.isPending ||
        groupsData.isPending ||
        hierarchyData.isPending ||
        monthlyData.isPending;

    const isError =
        summaryData.isError ||
        groupsData.isError ||
        hierarchyData.isError ||
        monthlyData.isError;

    if (isLoading) {
        return <DashboardLoading />;
    }

    if (isError || !summaryData.data || !groupsData.data || !hierarchyData.data || !monthlyData.data) {
        return (
            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
                <LoadingSpinner
                    label="대시보드 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
                    accent="emerald"
                />
            </div>
        );
    }

    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 scroll-smooth">
            <DashboardHeader />

            <div className="space-y-8">
                <section id="StatCard" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="총 배출량"
                        value={summaryData.data.total.amount.toFixed(2)}
                        unit={summaryData.data.unit}
                        description="전월 대비 8.4% 감소"
                        descriptionColor="text-emerald-600"
                    />

                    <StatCard
                        label="예상 탄소세"
                        value={formatDollar(summaryData.data.total.carbonTax)}
                        description=""
                        descriptionColor="text-amber-600"
                    />

                    <StatCard
                        label="관리 그룹"
                        value={groupsData.data.length}
                        unit="groups"
                        description=""
                    />

                    <StatCard
                        label="리스크 레벨"
                        value={summaryData.data.total.riskLevel}
                        description=""
                        descriptionColor="text-emerald-400"
                        dark
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <MonthlyEmissionChart
                        data={monthlyData.data.months}
                        unit={monthlyData.data.unit}
                    />
                    <ScopeBreakdownCard
                        scope1={summaryData.data.scope1.amount}
                        scope2={summaryData.data.scope2.amount}
                        scope3={summaryData.data.scope3.amount}
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                    <HierarchyEmissionCard
                        hierarchyData={hierarchyData.data}
                    />
                </section>
            </div>
        </div>
    );
}
