import z from "zod";
import type { Group } from "@/lib/client/types/groups";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    group?: Group | undefined;
    groups: Group[] | undefined;
    onCreate: (name: string, parentId: string | null | undefined) => void;
    onUpdate: (id: number, name: string, parentId: string | null | undefined) => void;
    onDelete: (id: number) => void;
    onCancelEdit: () => void;
};

const FormSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    parentId: z.string(),
})

type FormType = z.infer<typeof FormSchema>

export default function GroupForm({
    group,
    groups,
    onCreate,
    onUpdate,
    onDelete,
    onCancelEdit,
}: Props) {
    const { register, handleSubmit, reset, setValues, formState: { errors } } = useForm<FormType>({
        resolver: zodResolver(FormSchema)
    })

    const onFormSubmit: SubmitHandler<FormType> = async ({ id, name, parentId }) => {
        try {
            if (group && id) {
                onUpdate(id, name, parentId);
            } else {
                onCreate(name, parentId);
            }

            reset();
        } catch (e) {
            alert("Error")
            console.log(e);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-emerald-600">
                {group ? "Edit Group" : "Create Group"}
            </p>

            <h4 className="mt-2 text-2xl font-bold text-slate-900">
                {group ? "그룹 수정" : "그룹 생성"}
            </h4>

            <div className="mt-6 space-y-4">
                {
                    group && (
                        <div>
                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">
                                    ID
                                </span>
                                <input
                                    {...register("id", { valueAsNumber: true })}
                                    name="id"
                                    type="number"
                                    placeholder="예 : 1"
                                    readOnly
                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 cursor-not-allowed"
                                />
                                <span className="text-sm font-bold text-red-300">
                                    {errors.id && errors.id?.message}
                                </span>
                            </label>
                        </div>
                    )
                }
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        그룹 이름
                    </label>
                    <input
                        {...register("name")}
                        placeholder="예: 본사, 공장 A"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    />
                    <span className="text-sm font-bold text-red-300">
                        {errors.name && errors.name?.message}
                    </span>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        상위 그룹
                    </label>
                    <select
                        {...register("parentId")}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    >
                        <option value="">없음</option>
                        {groups && groups
                            .filter((g) => g.id !== group?.id)
                            .map((g) => (
                                <option key={g.id} value={g.id.toString()}>
                                    {g.name}
                                </option>
                            ))}
                    </select>
                    <span className="text-sm font-bold text-red-300">
                        {errors.parentId && errors.parentId?.message}
                    </span>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        {group ? "수정하기" : "생성하기"}
                    </button>

                    {group && (
                        <button
                            onClick={onCancelEdit}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            취소
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}