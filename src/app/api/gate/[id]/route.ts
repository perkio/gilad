import { auth } from "../../../auth";
import { getUserWithGates } from "../../../query/get-users-with-gates";
import { push } from "../../../notification";
import { pressButton } from "../../../home-api";

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
  console.log(`User ${user.id} is pressing ${gate.gates.entity_id}`)
  try {
    await pressButton(gate.gates.entity_id!);
    return new Response(JSON.stringify({ result: "success" }));
  } catch (e) {
    void push({ body: `Unable to open gate ${gate.gates.name} for ${user.name}`, title: "Gate API Error" });
    console.error("Unable to open gate", e);
    return Response.json({ message: "Service Unavailable" }, { status: 503 })
  }
}