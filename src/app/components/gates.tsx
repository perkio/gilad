import { auth } from "../auth";
import { GateButton } from "./gate-button";
import { getUserWithGates } from "../query/get-users-with-gates";

export async function Gates() {
    const session = await auth();

    if (!session || !session.user?.id) {
        return (
            <div>test</div>
        );
    }


    const user = await getUserWithGates(Number(session.user.id))
    if (user.gates_access.length === 0) {
        return (
            <div>טרם קיבלת הרשאה, אנא פנה לועד עם כתובת המייל שאיתה הזדהית: {session.user?.email}</div>
        )    
    }

    return user.gates_access.map(({ gate_id, gates }) =>
        (<GateButton key={gate_id} name={gates.name!} gate_id={gates.id!.toString()}/>)
    )
}