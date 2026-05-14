"use client"

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { document } from "@/lib/server/zod/openApi";


export default function ApiDocsPage() {
  return <SwaggerUI spec={document} />;
}