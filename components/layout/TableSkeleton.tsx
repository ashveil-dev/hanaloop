type Props = {
    title?: string;
    description?: string;
    rows?: number;
    columns?: number;
};

export default function TableSkeleton({
    title = "목록",
    description = "데이터를 불러오는 중입니다.",
    rows = 5,
    columns = 5,
}: Props) {
    return (
        <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <div className="h-7 w-32 rounded-lg bg-slate-200" />
                <div className="mt-2 h-4 w-64 rounded-lg bg-slate-100" />
                <p className="sr-only">{description}</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <div className="flex gap-4">
                        {Array.from({ length: columns }).map((_, index) => (
                            <div
                                key={index}
                                className="h-4 flex-1 rounded bg-slate-200"
                                aria-hidden
                            />
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex gap-4 px-5 py-4">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <div
                                    key={colIndex}
                                    className="h-4 flex-1 rounded bg-slate-100"
                                    aria-hidden
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <span className="sr-only">{title} 로딩 중</span>
        </div>
    );
}
