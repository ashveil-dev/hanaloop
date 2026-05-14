import { registry } from "@/lib/server/openapi/registry";
import {
    createEmissionRecordSchema,
    getEmissionRecordSchema,
    deleteEmissionRecordSchema,
    updateEmissionRecordSchema
} from "@/lib/server/schema/EmissionRecordsSchema"

// getEmissionRecord
registry.registerPath({
    method: "get",
    path: "/api/emission-records/{id}",
    tags: ["EmissionRecords"],
    request: {
        params: getEmissionRecordSchema,
    },
    responses: {
        200: {
            description: "배출량 조회 성공",
        },
    },
});

// getEmissionRecords
registry.registerPath({
    method: "get",
    path: "/api/emission-records",
    tags: ["EmissionRecords"],
    responses: {
        200: {
            description: "배출량 목록 조회 성공",
        },
    },
});

// createEmissionRecord
registry.registerPath({
    method: "post",
    path: "/api/emission-records",
    tags: ["EmissionRecords"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createEmissionRecordSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "배출량 생성 성공",
        },
    },
});

// updateEmissionRecords
registry.registerPath({
    method: "patch",
    path: "/api/emission-records/{id}",
    tags: ["EmissionRecords"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: updateEmissionRecordSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "배출량 수정 성공",
        },
    },
});

// deleteEmissionRecords
registry.registerPath({
    method: "delete",
    path: "/api/emission-records/{id}",
    tags: ["EmissionRecords"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: deleteEmissionRecordSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "배출량 삭제 성공",
        },
    },
});

