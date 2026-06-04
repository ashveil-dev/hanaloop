type Props = {
    children: React.ReactNode;
};

export default function PageHeaderActions({ children }: Props) {
    return (
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap md:w-auto">
            {children}
        </div>
    );
}
