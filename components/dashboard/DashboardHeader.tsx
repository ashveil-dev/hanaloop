export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium text-emerald-600 mb-2">
          Dashboard
        </p>
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          대시보드
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          조직 전체의 탄소 배출량, 탄소세 예상 비용, Scope별 현황을 한눈에 확인하세요.
        </p>
      </div>
    </div>
  );
}