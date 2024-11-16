
import { pressButton } from "@/app/clients/home-api";
import { getUserWithGatesByPhone } from "@/app/query/get-users-with-gates";
import { validateRequest } from "twilio/lib/webhooks/webhooks"

const authToken = process.env.TWILIO_AUTH_TOKEN ?? "";
const url = process.env.TWILIO_WEBHOOK_URL ?? "";

function buildTwilioResponse(reason: "busy" | "rejected") {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Reject reason="${reason}" />
    </Response>`;
}

export async function POST(request: Request) {
    const signature = request.headers.get("X-Twilio-Signature");
    if (!signature) {
        return new Response("Forbidden", {
            status: 403,
        })
    }

    const data = await request.formData();
    const obj: Record<string, FormDataEntryValue> = {};
    data.forEach((value, key) => (obj[key] = value));
    
    if (!validateRequest(authToken, signature, url, obj)) {
        console.error("Invalid twilio request");

        return new Response("Forbidden", {
            status: 403,
        })
    }

    const { From } = obj;

    if (!From || typeof From !== "string" || !From.startsWith("+972")) {
        console.error("Invalid from number", From);

        return new Response("Forbidden", {
            status: 403,
        });
    }

    console.log("Twilio verified!", From)

    const user = await getUserWithGatesByPhone(From.replace("+972", "0"));
    if (user) {
        console.log("User found", user.name);
        if (user.gates_access.length) {
            await pressButton(user.gates_access[0].gates.entity_id!);
        }
    } 

    return new Response(buildTwilioResponse("busy"), {
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
    }) 

}