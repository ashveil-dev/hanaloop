const monthlyData = [45, 62, 38, 72, 55, 48];

export default function MonthlyEmissionChart() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-bold text-slate-900">
                        월별 탄소 배출량
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                        최근 6개월 배출량 추이
                    </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    -8.4%
                </span>
            </div>

            <div className="flex h-72 items-end gap-4">
                {monthlyData.map((height, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-3">
                        <div className="flex h-56 w-full items-end overflow-hidden rounded-2xl bg-slate-100">
                            <div
                                className="w-full rounded-2xl bg-gradient-to-t from-emerald-600 to-teal-300"
                                style={{ height: `${height}%` }}
                            />
                        </div>
                        <span className="text-xs text-slate-400">
                            {index + 1}월
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}