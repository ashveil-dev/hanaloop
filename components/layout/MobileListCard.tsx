type Props = {
    children: React.ReactNode;
};

export default function MobileListCard({ children }: Props) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">{children}</div>
    );
}
