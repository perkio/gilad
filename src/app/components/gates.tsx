import { auth } from "../auth";
import { sql } from "@vercel/postgres";
import { GateButton } from "./gate-button";

export async function Gates() {
    const session = await auth();

    if (!session) {
        return (
            <div>test</div>
        );
    }

    const { rows } = await sql`
        SELECT name, gate_id
        FROM gates_access
        LEFT JOIN gates ON gates_access.gate_id = gates.id
        WHERE user_id=${session.user?.id}`;
    
    if (rows.length === 0) {
        return (
            <div>טרם קיבלת הרשאה, אנא פנה לועד עם כתובת המייל שאיתה הזדהית: {session.user?.email}</div>
        )    
    }

    return rows.map(({ name, gate_id }) =>
        (<GateButton key={gate_id} name={name} gate_id={gate_id}/>)
    )
}