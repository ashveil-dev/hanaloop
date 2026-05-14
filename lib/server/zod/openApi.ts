import {
    OpenAPIRegistry,
    OpenApiGeneratorV3
} from "@asteasolutions/zod-to-openapi";
import {
    createGroupSchema,
    deleteGroupSchema,
    getGroupSchema,
    updateGroupSchema
} from "@/lib/server/schema/GroupsSchema";
import {
    createEmissionRecordSchema,
    getEmissionRecordSchema,
    deleteEmissionRecordSchema,
    updateEmissionRecordSchema
} from "@/lib/server/schema/EmissionRecordsSchema";

const registry = new OpenAPIRegistry();
registry.register("GetGroup", getGroupSchema);
registry.register("CreateGroup", createGroupSchema);
registry.register("UpdateGroup", updateGroupSchema);
registry.register("DeleteGroup", deleteGroupSchema);

registry.register("GetEmissionRecord", getEmissionRecordSchema);
registry.register("CreateEmissionRecord", createEmissionRecordSchema);
registry.register("UpdateEmissionRecord", updateEmissionRecordSchema);
registry.register("DeleteEmissionRecord", deleteEmissionRecordSchema);

const generator = new OpenApiGeneratorV3(
    registry.definitions
);

const document = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "API",
        version: "1.0.0",
    },
});

export { document };