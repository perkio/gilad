import { auth } from "../../../auth";
import { getUserWithGates } from "../../../query/get-users-with-gates";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 })
  }

  const user = await getUserWithGates(Number(session.user?.id));
  const gate = user.gates_access.find(({ gate_id }) => (gate_id === Number(params.id)));
  if (!gate) {
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
      "entity_id": gate.gates.entity_id
    }),
  });

  console.log("<-", await res.text());
  return new Response(JSON.stringify({ result: "success" }));
}