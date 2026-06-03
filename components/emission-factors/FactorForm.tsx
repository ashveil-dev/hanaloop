import z from "zod";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import type { EmissionFactor } from "@/lib/client/types/emissionFactors";

export const FactorFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "이름을 입력해주세요"),
    category: z.string().min(1, "유형을 입력해주세요"),
    factor: z.number().positive("0보다 큰 계수를 입력해주세요"),
    inputUnit: z.string().min(1, "입력 단위를 입력해주세요"),
    outputUnit: z.string().min(1),
    description: z.string().optional(),
});

export type FactorFormType = z.infer<typeof FactorFormSchema>;

type Props = {
    form: UseFormReturn<FactorFormType>;
    factor?: EmissionFactor;
    onSubmit: SubmitHandler<FactorFormType>;
    onCancel: () => void;
};

export default function FactorForm({ form, factor, onSubmit, onCancel }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (factor) {
            reset({
                id: factor.id,
                name: factor.name,
                category: factor.category,
                factor: Number(factor.factor),
                inputUnit: factor.inputUnit,
                outputUnit: factor.outputUnit,
                description: factor.description ?? "",
            });
        } else {
            reset({
                name: "",
                category: "",
                factor: 0.456,
                inputUnit: "kWh",
                outputUnit: "kgCO2e",
                description: "",
            });
        }
    }, [factor, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-1">
            <p className="text-sm font-medium text-amber-600">
                {factor ? "Update Factor" : "Create Factor"}
            </p>
            <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {factor ? "배출 계수 수정" : "배출 계수 생성"}
            </h4>

            <div className="mt-6 space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-slate-700">이름</span>
                    <input
                        {...register("name")}
                        placeholder="예: 전기"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-300"
                    />
                    <span className="text-sm font-bold text-red-300">{errors.name?.message}</span>
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">유형</span>
                    <input
                        {...register("category")}
                        placeholder="예: 한국전력"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-300"
                    />
                    <span className="text-sm font-bold text-red-300">{errors.category?.message}</span>
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">배출 계수</span>
                    <input
                        {...register("factor", { valueAsNumber: true })}
                        type="number"
                        step="0.000001"
                        placeholder="예: 0.456"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-300"
                    />
                    <span className="text-sm font-bold text-red-300">{errors.factor?.message}</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">입력 단위</span>
                        <input
                            {...register("inputUnit")}
                            placeholder="kWh"
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-300"
                        />
                        <span className="text-sm font-bold text-red-300">{errors.inputUnit?.message}</span>
                    </label>
                    <label className="block">
                        <span className="text-sm font-medium text-slate-700">출력 단위</span>
                        <input
                            {...register("outputUnit")}
                            placeholder="kgCO2e"
                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-300"
                        />
                        <span className="text-sm font-bold text-red-300">{errors.outputUnit?.message}</span>
                    </label>
                </div>

                <label className="block">
                    <span className="text-sm font-medium text-slate-700">설명</span>
                    <input
                        {...register("description")}
                        placeholder="전력 사용 배출 계수"
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-amber-300"
                    />
                </label>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 cursor-pointer rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-700"
                    >
                        {factor ? "수정하기" : "생성하기"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cursor-pointer rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        취소
                    </button>
                </div>
            </div>
        </form>
    );
}
