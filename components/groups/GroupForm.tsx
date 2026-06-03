import z from "zod";
import type { Group } from "@/lib/client/types/groups";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

export const GroupFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "그룹 이름을 입력해주세요"),
    parentId: z.string().optional(),
});

export type GroupFormType = z.infer<typeof GroupFormSchema>;

type Props = {
    form: UseFormReturn<GroupFormType>;
    group?: Group;
    groups: Group[] | undefined;
    onSubmit: SubmitHandler<GroupFormType>;
    onCancel: () => void;
};

export default function GroupForm({
    form,
    group,
    groups,
    onSubmit,
    onCancel,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = form;

    const parentId = watch("parentId");
    const selectedParent = parentId
        ? groups?.find((g) => g.id === Number(parentId))
        : undefined;
    const isTopLevel = !parentId || parentId === "";

    useEffect(() => {
        if (group) {
            reset({
                id: group.id,
                name: group.name,
                parentId: group.parentId ? group.parentId.toString() : "",
            });
        } else {
            reset({ name: "", parentId: "" });
        }
    }, [group, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-1">
            <p className="text-sm font-medium text-cyan-600">
                {group ? "Edit Group" : "Create Group"}
            </p>

            <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {group ? "그룹 수정" : "그룹 생성"}
            </h4>

            <div className="mt-6 space-y-4">
                {group && (
                    <div>
                        <label className="block">
                            <span className="text-sm font-medium text-slate-700">ID</span>
                            <input
                                {...register("id", { valueAsNumber: true })}
                                type="number"
                                readOnly
                                className="mt-2 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-400"
                            />
                            <span className="text-sm font-bold text-red-300">
                                {errors.id?.message}
                            </span>
                        </label>
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        그룹 이름
                    </label>
                    <input
                        {...register("name")}
                        placeholder="예: 본사, 공장 A"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-300 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                    <span className="text-sm font-bold text-red-300">
                        {errors.name?.message}
                    </span>
                </div>

                <div>
                    <span className="text-sm font-medium text-slate-700">상위 그룹</span>
                    <div
                        className={`mt-2 rounded-2xl border px-4 py-3 text-sm ${
                            isTopLevel
                                ? "border-slate-200 bg-slate-50 text-slate-600"
                                : "border-cyan-200 bg-cyan-50 text-cyan-900"
                        }`}
                    >
                        {isTopLevel ? (
                            <div>
                                <p className="font-semibold">없음</p>
                                <p className="mt-0.5 text-xs text-slate-500">최상위 그룹</p>
                            </div>
                        ) : selectedParent ? (
                            <div>
                                <p className="font-semibold">{selectedParent.name}</p>
                                <p className="mt-0.5 text-xs text-cyan-700">
                                    그룹 ID: {selectedParent.id}
                                </p>
                            </div>
                        ) : (
                            "오른쪽 목록에서 상위 그룹을 선택하세요"
                        )}
                    </div>
                    <span className="text-sm font-bold text-red-300">
                        {errors.parentId?.message}
                    </span>
                </div>

            </div>

            <div className="mt-10 flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 cursor-pointer rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700"
                    >
                        {group ? "수정하기" : "생성하기"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        취소
                    </button>
            </div>
        </form>
    );
}
