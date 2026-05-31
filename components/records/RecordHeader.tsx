type RecordHeaderProps = {
    onRefresh: () => void;
    onCreate: () => void;
};

export default function RecordHeader({ onRefresh, onCreate }: RecordHeaderProps) {
    return (
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-sm font-medium text-emerald-600">
                    Emission Records Management
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    배출 레코드 관리
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    조직별 탄소 배출 데이터를 생성, 조회, 수정, 삭제할 수 있습니다.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onCreate}
                    className="cursor-pointer rounded-xl border border-emerald-600 bg-white px-5 py-3 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50"
                >
                    레코드 생성
                </button>
                <button
                    onClick={onRefresh}
                    className="cursor-pointer rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                    레코드 새로고침
                </button>
            </div>
        </header>
    );
}