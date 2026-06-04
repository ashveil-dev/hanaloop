import PageHeaderActions from "@/components/layout/PageHeaderActions";

type RecordHeaderProps = {
    onRefresh: () => void;
    onCreate: () => void;
};

export default function RecordHeader({ onRefresh, onCreate }: RecordHeaderProps) {
    return (
        <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
                <p className="text-sm font-medium text-teal-600">Emission Records</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    배출 레코드
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    조직별 탄소 배출 데이터를 생성, 조회, 수정, 삭제할 수 있습니다.
                </p>
            </div>

            <PageHeaderActions>
                <button
                    type="button"
                    onClick={onCreate}
                    className="cursor-pointer rounded-xl border border-teal-600 bg-white px-5 py-3 text-sm font-semibold text-teal-600 shadow-sm transition hover:bg-teal-50 sm:flex-1 md:flex-none"
                >
                    레코드 생성
                </button>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="cursor-pointer rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 sm:flex-1 md:flex-none"
                >
                    레코드 새로고침
                </button>
            </PageHeaderActions>
        </header>
    );
}
