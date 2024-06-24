import { sql } from "@vercel/postgres";
import { auth } from "../../../auth";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 })
  }

  const { rows } = await sql`
    SELECT name, gate_id, entity_id
    FROM gates_access
    LEFT JOIN gates ON gates_access.gate_id = gates.id
    WHERE user_id=${session.user?.id} AND gate_id=${params.id}`;
    
  if (rows.length !== 1) {
    return Response.json({ message: "Forbidden" }, { status: 403 })
  }
  
  const url = new URL("/api/services/button/press", process.env.HOME_URL);
  console.log("->", url);

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${process.env.HOME_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      "entity_id": rows[0].entity_id
    }),
  });

  console.log("<-", await res.text());
  return new Response(JSON.stringify({ result: "success" }));
}