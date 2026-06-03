"use client"
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import StatCard from "@/components/dashboard/StatCard";
import MonthlyEmissionChart from "@/components/dashboard/MonthlyEmissionChart";
import ScopeTrendLineChart from "@/components/dashboard/ScopeTrendLineChart";
import ScopePieChart from "@/components/dashboard/ScopePieChart";
import FactorCategoryPieChart from "@/components/dashboard/FactorCategoryPieChart";
import CarbonTaxLineChart from "@/components/dashboard/CarbonTaxLineChart";
import TopGroupsBarChart from "@/components/dashboard/TopGroupsBarChart";
import HierarchyEmissionCard from "@/components/dashboard/HierarchyEmissionCard";
import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { getDashboardSummary } from "@/lib/client/api/getDashboardSummary";
import { getMonthlyEmissions } from "@/lib/client/api/getMonthlyEmissions";
import { getEmissionsByFactorCategory } from "@/lib/client/api/getEmissionsByFactorCategory";
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

    const categoryData = useQuery({
        queryKey: ["getEmissionsByFactorCategory"],
        queryFn: getEmissionsByFactorCategory,
    })

    const isLoading =
        summaryData.isPending ||
        groupsData.isPending ||
        hierarchyData.isPending ||
        monthlyData.isPending ||
        categoryData.isPending;

    const isError =
        summaryData.isError ||
        groupsData.isError ||
        hierarchyData.isError ||
        monthlyData.isError ||
        categoryData.isError;

    if (isLoading) {
        return <DashboardLoading />;
    }

    if (
        isError ||
        !summaryData.data ||
        !groupsData.data ||
        !hierarchyData.data ||
        !monthlyData.data ||
        !categoryData.data
    ) {
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
                    <ScopeTrendLineChart
                        data={monthlyData.data.months}
                        unit={monthlyData.data.unit}
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <ScopePieChart
                        scope1={summaryData.data.scope1.amount}
                        scope2={summaryData.data.scope2.amount}
                        scope3={summaryData.data.scope3.amount}
                        unit={summaryData.data.unit}
                    />
                    <FactorCategoryPieChart
                        categories={categoryData.data.categories}
                        unit={categoryData.data.unit}
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CarbonTaxLineChart data={monthlyData.data.months} />
                    <TopGroupsBarChart
                        hierarchy={hierarchyData.data}
                        unit={hierarchyData.data.unit}
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
