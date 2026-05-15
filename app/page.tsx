import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";

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
        <AppSidebar sections={sections} />
        <DashboardMain />
      </main>
    </div>
  );
}