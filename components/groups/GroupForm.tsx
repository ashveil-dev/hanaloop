import { useEffect, useState } from "react";
import type { Group } from "./GroupMain";

type Props = {
    groups: Group[] | undefined;
    editingGroup: Group | null;
    onCreate: (name: string, parentId: number | null) => void;
    onUpdate: (id: number, name: string, parentId: number | null) => void;
    onCancelEdit: () => void;
};

export default function GroupForm({
    groups,
    editingGroup,
    onCreate,
    onUpdate,
    onCancelEdit,
}: Props) {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");

    useEffect(() => {
        if (editingGroup) {
            setName(editingGroup.name);
            setParentId(editingGroup.parentId?.toString() ?? "");
        }
    }, [editingGroup]);

    const submit = () => {
        if (!name.trim()) return;

        const parsedParentId = parentId === "" ? null : Number(parentId);

        if (editingGroup) {
            onUpdate(editingGroup.id, name, parsedParentId);
        } else {
            onCreate(name, parsedParentId);
        }

        setName("");
        setParentId("");
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-emerald-600">
                {editingGroup ? "Edit Group" : "Create Group"}
            </p>

            <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {editingGroup ? "그룹 수정" : "그룹 생성"}
            </h4>

            <div className="mt-6 space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        그룹 이름
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="예: 본사, 공장 A"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        상위 그룹
                    </label>
                    <select
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    >
                        <option value="">없음</option>
                        {groups && groups
                            .filter((group) => group.id !== editingGroup?.id)
                            .map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={submit}
                        className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        {editingGroup ? "수정하기" : "생성하기"}
                    </button>

                    {editingGroup && (
                        <button
                            onClick={onCancelEdit}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            취소
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}