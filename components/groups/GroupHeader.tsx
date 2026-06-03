type Props = {
    onRefresh: () => void;
    onCreate: () => void;
};

export default function GroupHeader({ onRefresh, onCreate }: Props) {
    return (
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-sm font-medium text-cyan-600">Group Management</p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    그룹 관리
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    탄소 배출 데이터를 조직 계층 단위로 관리하세요.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onCreate}
                    className="cursor-pointer rounded-xl border border-cyan-600 bg-white px-5 py-3 text-sm font-semibold text-cyan-600 shadow-sm transition hover:bg-cyan-50"
                >
                    그룹 생성
                </button>
                <button
                    type="button"
                    onClick={onRefresh}
                    className="cursor-pointer rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
                >
                    그룹 새로고침
                </button>
            </div>
        </header>
    );
}
