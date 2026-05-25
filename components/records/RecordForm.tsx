import { SubmitHandler, UseFormReturn } from "react-hook-form";
import z from "zod";
import type { Group } from "@/lib/client/types/groups";

export const RecordFormSchema = z.object({
    id: z.number().optional(),
    groupId: z.number({ error: "그룹을 선택해주세요" }),
    scopeType: z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]),
    amount: z.number(),
    unit: z.string(),
    recordedAt: z.string(),
});

export type RecordFormType = z.infer<typeof RecordFormSchema>;

type RecordFormProps = {
    form: UseFormReturn<RecordFormType>;
    groups: Group[] | undefined;
    isEdit: boolean;
    onSubmit: SubmitHandler<RecordFormType>;
    onCancel: () => void;
};

export default function RecordForm({
    form,
    groups,
    isEdit,
    onSubmit,
    onCancel,
}: RecordFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = form;

    const selectedGroupId = watch("groupId");
    const selectedGroup = groups?.find((g) => g.id === selectedGroupId);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-1">
            <p className="text-sm font-medium text-emerald-600">
                {isEdit ? "Update Record" : "Create Record"}
            </p>

            <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {isEdit ? "레코드 수정" : "레코드 생성"}
            </h4>

            <div className="mt-6 space-y-5">
                {isEdit && (
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">ID</span>
                        <input
                            {...register("id", { valueAsNumber: true })}
                            type="number"
                            disabled
                            className="mt-2 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                        />
                        <span className="text-sm font-bold text-red-300">
                            {errors.id?.message}
                        </span>
                    </label>
                )}

                <div>
                    <span className="text-sm font-medium text-slate-700">선택된 그룹</span>
                    <div
                        className={`mt-2 rounded-2xl border px-4 py-3 text-sm ${
                            selectedGroup
                                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                : "border-slate-200 bg-slate-50 text-slate-500"
                        }`}
                    >
                        {selectedGroup ? (
                            <div>
                                <p className="font-semibold">{selectedGroup.name}</p>
                                <p className="mt-0.5 text-xs text-emerald-700">
                                    그룹 ID: {selectedGroup.id}
                                </p>
                            </div>
                        ) : (
                            "오른쪽 목록에서 그룹을 검색하고 선택하세요"
                        )}
                    </div>
                    <span className="text-sm font-bold text-red-300">
                        {errors.groupId?.message}
                    </span>
                </div>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">Scope 타입</span>
                    <select
                        {...register("scopeType")}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                    >
                        <option value="SCOPE1">SCOPE1</option>
                        <option value="SCOPE2">SCOPE2</option>
                        <option value="SCOPE3">SCOPE3</option>
                    </select>
                    <span className="text-sm font-bold text-red-300">
                        {errors.scopeType?.message}
                    </span>
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">배출량</span>
                    <input
                        {...register("amount", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        placeholder="예: 1200.50"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                    />
                    <span className="text-sm font-bold text-red-300">
                        {errors.amount?.message}
                    </span>
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">단위</span>
                    <input
                        {...register("unit")}
                        placeholder="tCO2e"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                    />
                    <span className="text-sm font-bold text-red-300">
                        {errors.unit?.message}
                    </span>
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">기록일</span>
                    <input
                        {...register("recordedAt")}
                        type="date"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                    />
                    <span className="text-sm font-bold text-red-300">
                        {errors.recordedAt?.message}
                    </span>
                </label>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="flex-1 cursor-pointer rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        {isEdit ? "수정하기" : "생성하기"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        취소
                    </button>
                </div>
            </div>
        </form>
    );
}
