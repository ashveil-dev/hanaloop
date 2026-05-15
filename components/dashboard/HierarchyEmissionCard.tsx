import type { Hierarchy } from "@/lib/client/types/dashboard";

type Parameter = {
    hierarchyData: Hierarchy
}

export default function HierarchyEmissionCard({
    hierarchyData
}: Parameter) {
    const sum = hierarchyData.children.reduce((acc, cur) => acc + cur.totalEmission.total, 0)
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="text-xl font-bold text-slate-900">
                계층별 배출량
            </h4>
            <p className="mb-6 mt-1 text-sm text-slate-500">
                조직 단위별 총 배출량 비교
            </p>

            <div className="space-y-4">
                {hierarchyData.children.map((child) => (
                    <div key={child.id} className="rounded-2xl border border-slate-100 p-4">
                        <div className="mb-3 flex justify-between">
                            <span className="font-medium text-slate-800">{child.name}</span>
                            <span className="text-sm text-slate-500">{child.totalEmission.total} ({child.unit}) {((child.totalEmission.total / sum) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-slate-800"
                                style={{ width: `${child.totalEmission.total / sum * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}