import z from "zod";
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
 *             parentId:
 *               type: string
 *               nullable: true
 */

/*
{
    "message": "입력값이 올바르지 않습니다.",
    "errors": {
        "formErrors": [],
        "fieldErrors": {
            "name": [
                "Invalid input: expected string, received undefined"
            ]
        }
    }
}
*/

const createGroupSchema = z.object({
  name: z.string(),
  parentId: z.string().nullable().default(null).transform(v => v ? parseInt(v) : null)
})


export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createGroupSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({
      message: "invalid input",
      errors: parsed.error.flatten()
    }, {
      status: 400
    }
    )
  }


  const result = await createGroup(parsed.data)

  return result;

}