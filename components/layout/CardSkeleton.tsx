import clsx from "clsx";

type Props = {
    count?: number;
    darkLast?: boolean;
};

export default function CardSkeleton({ count = 3, darkLast = false }: Props) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => {
                const isDark = darkLast && index === count - 1;

                return (
                    <div
                        key={index}
                        className={clsx(
                            "animate-pulse rounded-3xl border p-6 shadow-sm",
                            isDark
                                ? "border-slate-800 bg-slate-900"
                                : "border-slate-200 bg-white"
                        )}
                    >
                        <div
                            className={clsx(
                                "h-4 w-24 rounded-lg",
                                isDark ? "bg-slate-700" : "bg-slate-200"
                            )}
                        />
                        <div
                            className={clsx(
                                "mt-4 h-9 w-20 rounded-lg",
                                isDark ? "bg-slate-700" : "bg-slate-200"
                            )}
                        />
                        <div
                            className={clsx(
                                "mt-4 h-4 w-32 rounded-lg",
                                isDark ? "bg-slate-700" : "bg-slate-200"
                            )}
                        />
                    </div>
                );
            })}
        </>
    );
}
