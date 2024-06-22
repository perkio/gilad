// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.
 
export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function POST(request: Request) {
  // TODO: call gateway
  const url = new URL("/api/services/button/press", process.env.HOME_URL);
  console.log("->", url);
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${process.env.HOME_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      "entity_id": "button.garage"
    }),
  });
  console.log("<-", await res.text());
  return new Response(JSON.stringify({ hello: "test" }));
}