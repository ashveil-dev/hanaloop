import PageHeaderActions from "@/components/layout/PageHeaderActions";

type Props = {
    onRefresh: () => void;
    onCreate: () => void;
};

export default function GroupHeader({ onRefresh, onCreate }: Props) {
    return (
        <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
                <p className="text-sm font-medium text-cyan-600">Group</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    그룹
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    탄소 배출 데이터를 조직 계층 단위로 관리하세요.
                </p>
            </div>

            <PageHeaderActions>
                <button
                    type="button"
                    onClick={onCreate}
                    className="cursor-pointer rounded-xl border border-cyan-600 bg-white px-5 py-3 text-sm font-semibold text-cyan-600 shadow-sm transition hover:bg-cyan-50 sm:flex-1 md:flex-none"
                >
                    그룹 생성
                </button>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="cursor-pointer rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 sm:flex-1 md:flex-none"
                >
                    그룹 새로고침
                </button>
            </PageHeaderActions>
        </header>
    );
}
