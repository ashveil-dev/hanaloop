import { z } from "@/lib/server/openapi"

const getHierarchySchema = z.object({
    id: z.number()
})

const getSummarySchema = z.object({
    id: z.number()
})

export {
    getHierarchySchema,
    getSummarySchema
}