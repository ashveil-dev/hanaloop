import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import RecordMain from "@/components/records/RecordMain";

const header = {
    title: "배출 기록 관리",
    description: "탄소 배출 데이터를 등록하고 관리할 수 있습니다.",
};

const sections = [
    {
        title: "레코드 목록",
        description: "",
        href: "#record-list",
    },
];

export default function RecordsPage() {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden">
            <AppHeader />

            <main className="flex min-h-0 flex-1 overflow-hidden">
                <AppSidebar header={header} sections={sections} />
                <RecordMain />
            </main>
        </div>
    );
}
