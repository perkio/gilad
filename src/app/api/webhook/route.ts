
import { createHmac } from "node:crypto";
import { validateRequest } from "twilio/lib/webhooks/webhooks"

const authToken = process.env.TWILIO_AUTH_TOKEN ?? "";

function buildTwilioResponse(reason: "busy" | "rejected") {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Reject reason="${reason}" />
    </Response>`;
}

const url = "https://grumpy-worlds-tan.loca.lt/api/webhook";

function verifyTwilio(params: string, signature: string) {
    const hmac = createHmac("sha1", authToken,);
    const full = `${url}?${params}`;
    hmac.update(full);
    const result = hmac.digest("base64");
    console.debug(full, signature, result);
    return signature === result;
}

export async function POST(request: Request) {
    const signature = request.headers.get("X-Twilio-Signature");
    if (signature) {

        const data = await request.formData();
        const obj: Record<string, FormDataEntryValue> = {};
        data.forEach((value, key) => (obj[key] = value));

        console.debug(url, signature, obj);
        if (validateRequest(authToken, signature, url, obj)) {
            console.log("Twilio verified!", obj)
        } else {
            console.log("Unable to verify", signature)
        }

    }

    return new Response(buildTwilioResponse("busy"), {
        status: 200,
        headers: { 'Content-Type': 'text/xml' }
    })
}