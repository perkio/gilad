import { Gate, User } from "@prisma/client";
import prisma from "../db";

export async function pressButton(user: User, gate: Gate, source: "web" | "twilio") {
  let type = "button";
  if (gate.entity_id!.startsWith("input_button")) {
    type = "input_button";
  }
  const url = new URL(`/api/services/${type}/press`, process.env.HOME_URL);
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${process.env.HOME_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      entity_id: gate.entity_id!
    }),
  });

  if (!res.ok) {
    throw res;
  }

  await prisma.gateAccessEvent.create({
    data: {
      gate_id: gate.id,
      user_id: user.id,
      type: "open",
      source,
    }
  });

  console.log("<-", await res.text());
}