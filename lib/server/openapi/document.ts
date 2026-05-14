import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "@/lib/server/openapi/registry";

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Carbon Dashboard API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  });
}