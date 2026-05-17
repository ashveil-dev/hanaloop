import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";

const header = {
  title: "탄소 배출 대시보드",
  description: "조직 전체의 탄소 배출 현황과 탄소세를 한눈에 확인할 수 있습니다.",
}

const sections = [
  {
    title: "전체 배출량",
    description: "",
    href: "#StatCard"
  },
  {
    title: "Scope별 배출량",
    description: "",
    href: "#ScopeBreakdownCard"
  },
  {
    title: "계층별 배출량",
    description: "",
    href: "#HierarchyEmissionCard"
  },
]

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <AppHeader />

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar header={header} sections={sections} />
        <DashboardMain />
      </main>
    </div>
  );
}