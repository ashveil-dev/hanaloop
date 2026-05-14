import { z } from "@/lib/server/zod"

const getGroupSchema = z.object({
    id: z.number()
})

const createGroupSchema = z.object({
    name: z.string(),
    parentId: z.string().nullable().default(null).transform(v => v ? parseInt(v) : null)
})

const updateGroupSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    parentId: z.number().optional(),
})

const deleteGroupSchema = z.object({
    id: z.number()
})

export {
    getGroupSchema,
    createGroupSchema,
    updateGroupSchema,
    deleteGroupSchema
}