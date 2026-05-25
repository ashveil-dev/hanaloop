type Props = {
  onRefresh: () => void;
  onCreate: () => void;
}

export default function GroupHeader({ onRefresh, onCreate }: Props) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium text-emerald-600">
          Group Management
        </p>
        <h3 className="text-3xl font-bold text-slate-900">
          그룹 관리
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          탄소 배출 데이터를 조직 계층 단위로 관리하세요.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onCreate}
          className="rounded-xl border border-emerald-600 bg-white px-4 py-2 text-sm font-medium text-emerald-600 shadow-sm hover:bg-emerald-50 cursor-pointer"
        >
          그룹 생성
        </button>
        <button
          onClick={onRefresh}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 cursor-pointer"
        >
          그룹 새로고침
        </button>
      </div>
    </div>
  );
}