export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          개요
        </h3>
        <p className="text-sm font-medium text-emerald-600 mb-2">
          Carbon Management Overview
        </p>
        <p className="mt-2 text-sm text-slate-500">
          조직 전체의 탄소 배출량, 탄소세 예상 비용, Scope별 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100">
          이번 달
        </button>
        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700">
          보고서 생성
        </button>
      </div>
    </div>
  );
}