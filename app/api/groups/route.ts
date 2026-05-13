import { getGroups } from "@/lib/server/services/groups/getGroups";

export async function GET() {
  return Response.json(
    await getGroups()
  );
}

export async function POST() {
  return Response.json(
    await getGroups()
  );
}