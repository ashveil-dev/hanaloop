import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import GroupMain from "@/components/groups/GroupMain";

export default function GroupsPage() {

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden">
            <AppHeader />

            <main className="flex min-h-0 flex-1 overflow-hidden">
                <AppSidebar />
                <GroupMain />
            </main>
        </div>
    );
}
