import { forwardRef } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { RecordFormType } from "./RecordMain";

type RecordFormProps = {
    form: UseFormReturn<RecordFormType>;
    isEdit: boolean;
    onSubmit: SubmitHandler<RecordFormType>;
    onCancel: () => void;
};

const RecordForm = forwardRef<HTMLFormElement, RecordFormProps>(
    ({ form, isEdit, onSubmit, onCancel }, ref) => {
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = form;

        return (
            <form
                id="RecordForm"
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
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

                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">그룹 ID</span>
                        <input
                            {...register("groupId", { valueAsNumber: true })}
                            type="number"
                            placeholder="예: 1"
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                        />
                        <span className="text-sm font-bold text-red-300">
                            {errors.groupId?.message}
                        </span>
                    </label>

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

                        {isEdit && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                취소
                            </button>
                        )}
                    </div>
                </div>
            </form>
        );
    }
);

export default RecordForm;