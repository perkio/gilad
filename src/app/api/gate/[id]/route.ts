import { auth } from "../../../auth";
import { getUserWithGates } from "../../../query/get-users-with-gates";
import { push } from "../../../clients/notification";
import { pressButton } from "../../../clients/home-api";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ message: "Not authenticated" }, { status: 401 })
  }

  const user = await getUserWithGates(session.user.id);
  const id = (await params).id;
  const gate = user.gates_access.find(({ gate_id }) => (gate_id === Number(id)));
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