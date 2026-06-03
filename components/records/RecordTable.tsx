import clsx from "clsx";
import type { EmissionRecord } from "@/lib/client/types/emissionRecords";
import type { Group } from "@/lib/client/types/groups";
import { formatEmission } from "@/lib/shared/calculateEmission";

const scopeStyle = {
    SCOPE1: "bg-red-100 text-red-700 border-red-200",
    SCOPE2: "bg-amber-100 text-amber-700 border-amber-200",
    SCOPE3: "bg-sky-100 text-sky-700 border-sky-200",
};

type RecordTableProps = {
    records: EmissionRecord[];
    groups?: Group[];
    onEdit: (record: EmissionRecord) => void;
    onDelete: (id: number) => void;
};

export default function RecordTable({
    records,
    groups,
    onEdit,
    onDelete,
}: RecordTableProps) {
    return (
        <div
            id="record-list"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <h4 className="text-2xl font-bold text-slate-900">레코드 목록</h4>
            <p className="mt-2 text-sm text-slate-500">
                활동량 × 배출 계수로 환산된 CO2e 배출량을 확인할 수 있습니다.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-5 py-4 text-center font-medium">ID</th>
                                <th className="px-5 py-4 text-center font-medium">그룹명</th>
                                <th className="px-5 py-4 text-center font-medium">배출 계수</th>
                                <th className="px-5 py-4 text-center font-medium">Scope</th>
                                <th className="px-5 py-4 text-center font-medium">활동량</th>
                                <th className="px-5 py-4 text-center font-medium">환산 배출량</th>
                                <th className="px-5 py-4 text-center font-medium">기록 날짜</th>
                                <th className="px-5 py-4 text-center font-medium">관리</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {records.map((record) => (
                                <tr key={record.id} className="bg-white text-center">
                                    <td className="px-5 py-4 text-slate-500">{record.id}</td>
                                    <td className="max-w-50 px-5 py-4 font-semibold">
                                        <div className="break-words whitespace-normal text-slate-900">
                                            {groups?.find((g) => g.id === record.groupId)?.name ?? ""}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-slate-700">
                                        {record.emissionFactor.name}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={clsx(
                                                "rounded-full border px-3 py-1 text-xs font-semibold",
                                                scopeStyle[record.scopeType]
                                            )}
                                        >
                                            {record.scopeType}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 font-semibold text-slate-900">
                                        {Number(record.amount).toLocaleString()} {record.unit}
                                    </td>
                                    <td className="px-5 py-4 font-bold text-teal-700">
                                        {formatEmission(record.calculatedEmission)}{" "}
                                        {record.emissionFactor.outputUnit}
                                    </td>
                                    <td className="px-5 py-4 text-slate-500">
                                        {record.recordedAt}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(record)}
                                                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                            >
                                                수정
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(record.id)}
                                                className="cursor-pointer rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {records.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-5 py-10 text-center text-slate-400"
                                    >
                                        등록된 배출 레코드가 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
