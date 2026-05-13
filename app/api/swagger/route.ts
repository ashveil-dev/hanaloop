import swaggerJSDoc from "swagger-jsdoc";

export async function GET() {
  const spec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hanaloop Backend Swagger",
        version: "1.0.0",
      },
    },
    apis: ["./app/api/**/*.ts"],
  });

  return Response.json(spec);
}