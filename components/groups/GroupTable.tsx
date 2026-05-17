import type { Group } from "@/lib/client/types/groups"

type Props = {
    groups: Group[] | undefined;
    onEdit: (group: Group) => void;
    onDelete: (id: number) => void;
};

export default function GroupTable({ groups, onEdit, onDelete }: Props) {
    const getParentName = (parentId: number | null) => {
        if (parentId === null) return "최상위 그룹";
        return groups?.find((group) => group.id === parentId)?.name ?? "알 수 없음";
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-bold text-slate-900">
                        그룹 목록
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                        생성된 그룹을 수정하거나 삭제할 수 있습니다.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-5 py-4 font-medium">ID</th>
                            <th className="px-5 py-4 font-medium">그룹명</th>
                            <th className="px-5 py-4 font-medium">상위 그룹</th>
                            <th className="px-5 py-4 font-medium">생성일</th>
                            <th className="px-5 py-4 text-right font-medium">관리</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {groups?.map((group) => (
                            <tr key={group.id} className="transition hover:bg-slate-50">
                                <td className="px-5 py-4 text-slate-500">
                                    #{group.id}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="font-semibold text-slate-900">
                                        {group.name}
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-slate-500">
                                    {getParentName(group.parentId)}
                                </td>

                                <td className="px-5 py-4 text-slate-500">
                                    {group.createdAt}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(group)}
                                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                                        >
                                            수정
                                        </button>

                                        <button
                                            onClick={() => onDelete(group.id)}
                                            className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {groups?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                                    생성된 그룹이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}