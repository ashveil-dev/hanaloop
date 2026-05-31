import { z } from "@/lib/server/openapi";

const createEmissionFactorSchema = z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    factor: z.number().positive(),
    inputUnit: z.string().min(1),
    outputUnit: z.string().default("kgCO2e"),
    description: z.string().optional(),
});

const updateEmissionFactorSchema = z.object({
    id: z.number(),
    name: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    factor: z.number().positive().optional(),
    inputUnit: z.string().min(1).optional(),
    outputUnit: z.string().optional(),
    description: z.string().optional(),
});

const deleteEmissionFactorSchema = z.object({
    id: z.number(),
});

export {
    createEmissionFactorSchema,
    updateEmissionFactorSchema,
    deleteEmissionFactorSchema,
};
