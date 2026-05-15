import { registry } from "@/lib/server/openapi/registry";
import {
    getHierarchySchema,
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
            description: "계층 조회 성공",
        },
    },
});


// getSummary
registry.registerPath({
    method: "get",
    path: "/api/dashboard/summary",
    tags: ["Dashboard"],
    responses: {
        200: {
            description: "개요 조회 성공",
        },
    },
});

