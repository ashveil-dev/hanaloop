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

// getMonthlyEmissions
registry.registerPath({
    method: "get",
    path: "/api/dashboard/monthly",
    tags: ["Dashboard"],
    responses: {
        200: {
            description: "월별 배출량 조회 성공",
        },
    },
});

// getEmissionsByFactorCategory
registry.registerPath({
    method: "get",
    path: "/api/dashboard/category",
    tags: ["Dashboard"],
    responses: {
        200: {
            description: "배출 계수 분류별 환산 배출량 조회 성공",
        },
    },
});

