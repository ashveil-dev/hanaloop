import CardSkeleton from "@/components/layout/CardSkeleton";

export default function DashboardLoading() {
    return (
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
            <div className="animate-pulse">
                <div className="h-4 w-24 rounded bg-emerald-100" />
                <div className="mt-3 h-9 w-48 rounded-lg bg-slate-200" />
                <div className="mt-2 h-4 w-72 rounded bg-slate-100" />
            </div>

            <div className="mt-8 space-y-8">
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <CardSkeleton count={4} darkLast />
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-6 w-40 rounded-lg bg-slate-200" />
                        <div className="mt-2 h-4 w-56 rounded-lg bg-slate-100" />
                        <div className="mt-8 flex h-64 items-end justify-between gap-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-full rounded-t-lg bg-slate-100"
                                    style={{ height: `${40 + (index % 3) * 20}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="h-6 w-36 rounded-lg bg-slate-200" />
                        <div className="mt-8 space-y-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-4 w-16 rounded bg-slate-200" />
                                        <div className="h-4 w-20 rounded bg-slate-100" />
                                    </div>
                                    <div className="h-3 w-full rounded-full bg-slate-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-44 rounded-lg bg-slate-200" />
                    <div className="mt-2 h-4 w-64 rounded-lg bg-slate-100" />
                    <div className="mt-6 space-y-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-12 rounded-2xl bg-slate-100"
                                style={{ marginLeft: `${index * 16}px` }}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
