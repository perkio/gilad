const token = process.env['PB_API_KEY'];

export async function push({ title, body }: { title: string, body: string }) {
    if (!token) {
        console.warn("pushbullet token is not set");
        return;
    }

    try {
        const res = await fetch("https://api.pushbullet.com/v2/pushes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Token": token,
            },
            body: JSON.stringify({
                type: "note",
                title,
                body,
            })
        });
        if (!res.ok) {
            console.warn("Failed to push", res);
        }
    } catch (e) {
        console.error("Failed to push", e);
    }
}