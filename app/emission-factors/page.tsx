import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import FactorMain from "@/components/emission-factors/FactorMain";

export default function EmissionFactorsPage() {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden">
            <AppHeader />
            <main className="flex min-h-0 flex-1 overflow-hidden">
                <AppSidebar />
                <FactorMain />
            </main>
        </div>
    );
}
