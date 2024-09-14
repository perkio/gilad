export async function pressButton(entity_id: string) {
  const url = new URL("/api/services/button/press", process.env.HOME_URL);
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