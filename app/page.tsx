import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import DashboardMain from "@/components/dashboard/DashboardMain";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <AppHeader />

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar />
        <DashboardMain />
      </main>
    </div>
  );
}