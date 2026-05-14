import { generateOpenApiDocument } from "@/lib/server/openapi/document";

export async function GET() {
  return Response.json(generateOpenApiDocument());
}