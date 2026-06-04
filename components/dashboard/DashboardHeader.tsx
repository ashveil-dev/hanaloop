export default function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="mb-2 text-sm font-medium text-emerald-600">Dashboard</p>
        <h3 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">대시보드</h3>
        <p className="mt-2 text-sm text-slate-500">
          조직 전체의 탄소 배출량, 탄소세 예상 비용, Scope별 현황을 한눈에 확인하세요.
        </p>
      </div>
    </div>
  );
}