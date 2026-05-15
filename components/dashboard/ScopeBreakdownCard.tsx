type ParameterType = {
  scope1: number,
  scope2: number,
  scope3: number,
}

export default function ScopeBreakdownCard({
  scope1, scope2, scope3
}: ParameterType) {
  const sum = scope1 + scope2 + scope3;

  return (
    <div id="ScopeBreakdownCard" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="text-xl font-bold text-slate-900">
        Scope별 배출량
      </h4>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        직접/간접 배출 비중
      </p>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Scope1</p>
              <p className="text-xs text-slate-400">직접 배출</p>
            </div>
            <span className="text-sm font-bold text-slate-900">{`${((scope1 / sum) * 100).toFixed(2)}%`}</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(scope1 / sum) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Scope2</p>
              <p className="text-xs text-slate-400">전력 사용</p>
            </div>
            <span className="text-sm font-bold text-slate-900">{`${((scope2 / sum) * 100).toFixed(2)}%`}</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-500"
              style={{ width: `${(scope2 / sum) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Scope3</p>
              <p className="text-xs text-slate-400">기타 간접</p>
            </div>
            <span className="text-sm font-bold text-slate-900">{`${((scope3 / sum) * 100).toFixed(2)}%`}</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{ width: `${(scope3 / sum) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}