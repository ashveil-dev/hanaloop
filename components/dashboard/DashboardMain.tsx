import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import MonthlyEmissionChart from "./MonthlyEmissionChart";
import ScopeBreakdownCard from "./ScopeBreakdownCard";
import HierarchyEmissionCard from "./HierarchyEmissionCard";

export default function DashboardMain() {
    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
            <DashboardHeader />

            <div className="space-y-8">
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        label="총 배출량"
                        value="42,380"
                        unit="tCO₂e"
                        description="전월 대비 8.4% 감소"
                        descriptionColor="text-emerald-600"
                    />

                    <StatCard
                        label="예상 탄소세"
                        value="₩128M"
                        description="기준치 초과 부서 3곳"
                        descriptionColor="text-amber-600"
                    />

                    <StatCard
                        label="관리 그룹"
                        value="18"
                        unit="groups"
                        description="4개 계층 구조"
                    />

                    <StatCard
                        label="리스크 레벨"
                        value="Moderate"
                        description="안정 구간에 근접"
                        descriptionColor="text-emerald-400"
                        dark
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <MonthlyEmissionChart />
                    <ScopeBreakdownCard />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <HierarchyEmissionCard />
                </section>
            </div>
        </div>
    );
}