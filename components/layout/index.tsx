import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <AppHeader />

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar />
        <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}