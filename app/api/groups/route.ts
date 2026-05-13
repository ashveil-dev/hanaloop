import { createGroup } from "@/lib/server/services/groups/createGroup";
import { getGroups } from "@/lib/server/services/groups/getGroups";

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: 그룹 목록 조회
 *     responses:
 *       200:
 *          description: 성공
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   name:
 *                     type: string
 *                     example: groupName
 *                   parent_id:
 *                     type: integer
 *                     example : 1
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
export async function GET() {
  return Response.json(
    await getGroups()
  );
}


/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: 그룹 추가하기
 *     consumes:
 *       application/json
 *     parameters:
 *       - in: body
 *         description: 추가할 그룹의 정보
 *         schema:
 *           type: object
 *           required:
 *             name
 *           properties:
 *             name:
 *               type: string
 *             parent_id:
 *               type: string
 *               nullable: true
 */

export async function POST(request: Request) {
  const body = await request.json();
  const { name, parent_id } = body;

  const result = await createGroup({
      name, 
      parent_id : parent_id ?? null
    })


  return Response.json(
    {
      success : "success"
    }
  );
}