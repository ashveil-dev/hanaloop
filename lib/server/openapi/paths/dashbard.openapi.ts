import { registry } from "@/lib/server/openapi/registry";
import {
    getHierarchySchema
} from "@/lib/server/schema/DashboardSchema"

// getHierarchy
registry.registerPath({
    method: "get",
    path: "/api/dashboard/hierarchy/{id}",
    tags: ["Dashboard"],
    request: {
        params: getHierarchySchema,
    },
    responses: {
        200: {
            description: "배출량 조회 성공",
        },
    },
});


