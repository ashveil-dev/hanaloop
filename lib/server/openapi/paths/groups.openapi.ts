import { registry } from "@/lib/server/openapi/registry";
import {
    getGroupSchema,
    createGroupSchema,
    updateGroupSchema,
    deleteGroupSchema
} from "@/lib/server/schema/GroupsSchema"

// getGroup
registry.registerPath({
    method: "get",
    path: "/api/groups/{id}",
    tags: ["Groups"],
    request: {
        params: getGroupSchema,
    },
    responses: {
        200: {
            description: "그룹 조회 성공",
        },
    },
});

// getGroups
registry.registerPath({
    method: "get",
    path: "/api/groups",
    tags: ["Groups"],
    responses: {
        200: {
            description: "그룹 조회 성공",
        },
    },
});

// createGroup
registry.registerPath({
    method: "post",
    path: "/api/groups",
    tags: ["Groups"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createGroupSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "그룹 생성 성공",
        },
    },
});

// updateGroup
registry.registerPath({
    method: "patch",
    path: "/api/groups/{id}",
    tags: ["Groups"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: updateGroupSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "그룹 수정 성공",
        },
    },
});

// deleteGroup
registry.registerPath({
    method: "delete",
    path: "/api/groups/{id}",
    tags: ["Groups"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: deleteGroupSchema,
                },
            },
        },
    },
    responses: {
        200: {
            description: "그룹 삭제 성공",
        },
    },
});

