import clsx from "clsx";

type RecordCardProps = {
    title: string;
    value: string;
    desc: string;
    dark?: boolean;
    highlight?: boolean;
};

export default function RecordCard({
    title,
    value,
    desc,
    dark = false,
    highlight = false,
}: RecordCardProps) {
    return (
        <div
            className={clsx(
                "rounded-3xl p-6 shadow-sm",
                dark
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white"
            )}
        >
            <p className={clsx("text-sm", dark ? "text-slate-400" : "text-slate-500")}>
                {title}
            </p>

            <h4 className={clsx("mt-3 text-3xl font-bold", dark ? "text-white" : "text-slate-900")}>
                {value}
            </h4>

            <p
                className={clsx(
                    "mt-3 text-sm",
                    dark || highlight ? "text-emerald-400" : "text-slate-500"
                )}
            >
                {desc}
            </p>
        </div>
    );
}