export async function pressButton(entity_id: string) {
  let type = "button";
  if (entity_id.startsWith("input_button")) {
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
      entity_id
    }),
  });

  if (!res.ok) {
    throw res;
  }

  console.log("<-", await res.text());
}