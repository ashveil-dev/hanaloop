const scopeData = [
  ["Scope 1", "직접 배출", "42%", "bg-emerald-500"],
  ["Scope 2", "전력 사용", "35%", "bg-teal-500"],
  ["Scope 3", "기타 간접", "23%", "bg-cyan-500"],
];

export default function ScopeBreakdownCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="text-xl font-bold text-slate-900">
        Scope별 배출량
      </h4>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        직접/간접 배출 비중
      </p>

      <div className="space-y-5">
        {scopeData.map(([name, desc, value, color]) => (
          <div key={name}>
            <div className="mb-2 flex justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">{name}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
              <span className="text-sm font-bold text-slate-900">{value}</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}