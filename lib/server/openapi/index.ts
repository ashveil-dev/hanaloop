import { z } from "zod";
import { OpenAPIRegistry, extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

export { z, registry }