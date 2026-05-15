const hierarchyData = [
    ["본사", "14,200 tCO₂e", "78%"],
    ["공장 A", "11,840 tCO₂e", "64%"],
    ["물류센터", "8,930 tCO₂e", "48%"],
    ["해외 법인", "7,410 tCO₂e", "39%"],
];

export default function HierarchyEmissionCard() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-xl font-bold text-slate-900">
                계층별 배출량
            </h4>
            <p className="mb-6 mt-1 text-sm text-slate-500">
                조직 단위별 총 배출량 비교
            </p>

            <div className="space-y-4">
                {hierarchyData.map(([name, amount, value]) => (
                    <div key={name} className="rounded-2xl border border-slate-100 p-4">
                        <div className="mb-3 flex justify-between">
                            <span className="font-medium text-slate-800">{name}</span>
                            <span className="text-sm text-slate-500">{amount}</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-slate-800"
                                style={{ width: value }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}