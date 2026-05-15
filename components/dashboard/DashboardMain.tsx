import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import MonthlyEmissionChart from "./MonthlyEmissionChart";
import ScopeBreakdownCard from "./ScopeBreakdownCard";
import HierarchyEmissionCard from "./HierarchyEmissionCard";
import { getDashboardSummary } from "@/lib/client/api/getDashboardSummary";
import { getGroups } from "@/lib/client/api/getGroups";
import { getHierarchy } from "@/lib/client/api/getHierarchy";

function formatDollar(value: number) {
  return `$${value.toLocaleString()}`;
}

export default async function DashboardMain() {
    const summaryData = await getDashboardSummary();
    const groupsData = await getGroups();
    const hierarchyData = await getHierarchy({
        id: groupsData.find(group => group.parentId === null)?.id
    });

    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 scroll-smooth">
            <DashboardHeader />

            <div className="space-y-8">
                <section id="StatCard" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="총 배출량"
                        value={summaryData.total.amount.toFixed(2)}
                        unit={summaryData.unit}
                        description="전월 대비 8.4% 감소"
                        descriptionColor="text-emerald-600"
                    />

                    <StatCard
                        label="예상 탄소세"
                        value={formatDollar(summaryData.total.carbonTax)}
                        description=""
                        descriptionColor="text-amber-600"
                    />

                    <StatCard
                        label="관리 그룹"
                        value={groupsData.length}
                        unit="groups"
                        description=""
                    />

                    <StatCard
                        label="리스크 레벨"
                        value={summaryData.total.riskLevel}
                        description=""
                        descriptionColor="text-emerald-400"
                        dark
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <MonthlyEmissionChart />
                    <ScopeBreakdownCard
                        scope1={summaryData.scope1.amount}
                        scope2={summaryData.scope2.amount}
                        scope3={summaryData.scope3.amount}
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-1">
                    <HierarchyEmissionCard
                        hierarchyData={hierarchyData}
                    />
                </section>
            </div>
        </div>
    );
}