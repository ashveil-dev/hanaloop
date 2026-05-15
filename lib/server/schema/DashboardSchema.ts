import { z } from "@/lib/server/openapi"

const getHierarchySchema = z.object({
    id: z.number()
})

export {
    getHierarchySchema,
}