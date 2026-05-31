import { registry } from "@/lib/server/openapi/registry";

registry.registerPath({
    method: "get",
    path: "/api/emission-factors",
    tags: ["Emission Factors"],
    responses: {
        200: { description: "배출 계수 목록 조회 성공" },
    },
});

registry.registerPath({
    method: "post",
    path: "/api/emission-factors",
    tags: ["Emission Factors"],
    responses: {
        200: { description: "배출 계수 생성 성공" },
    },
});

registry.registerPath({
    method: "put",
    path: "/api/emission-factors/{id}",
    tags: ["Emission Factors"],
    responses: {
        200: { description: "배출 계수 수정 성공" },
    },
});

registry.registerPath({
    method: "delete",
    path: "/api/emission-factors/{id}",
    tags: ["Emission Factors"],
    responses: {
        200: { description: "배출 계수 삭제 성공" },
    },
});
