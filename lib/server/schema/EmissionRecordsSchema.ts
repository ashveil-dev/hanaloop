import { z } from "@/lib/server/zod"

const createEmissionRecordSchema = z.object({
    groupId: z.number(),
    scopeType: z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]),
    amount: z.number().transform(v => v.toString()),
    unit: z.string().default("tCO2e"),
    recordedAt: z.string().optional()
        .default(
            new Date().toISOString().split("T")[0]
        )
});

const getEmissionRecordSchema = z.object({
    id: z.number()
})

const deleteEmissionRecordSchema = z.object({
    id: z.number()
})

const updateEmissionRecordSchema = z.object({
    id: z.number(),
    groupId: z.number().optional(),
    scopeType: z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]).optional(),
    amount: z.number().transform(v => v.toString()).optional(),
    unit: z.string().optional(),
    recordedAt: z.string()
        .default(
            new Date().toISOString().split("T")[0]
        ).optional()
})

export {
    createEmissionRecordSchema,
    getEmissionRecordSchema,
    deleteEmissionRecordSchema,
    updateEmissionRecordSchema
}