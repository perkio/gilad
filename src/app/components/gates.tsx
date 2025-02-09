import React, { EventHandler, FormEvent, SyntheticEvent } from "react";
import { auth } from "../auth";
import { GateButton } from "./gate-button";
import { allGates, getUserWithGates } from "../query/get-users-with-gates";
import { UpdateUserInfoFrom } from "./user-info-from";
import Image from "next/image";

export async function Gates() {
    const session = await auth();

    if (!session || !session.user?.id) {
        return (
            <div>test</div>
        );
    }

    const user = await getUserWithGates(session.user.id)
    if (!user.info) {
        const all = await allGates();
        return <UpdateUserInfoFrom allGates={all} />
    }

    if (user.gates_access.length === 0) {
        return (
            <div>טרם קיבלת הרשאה, אנא פנה לועד עם כתובת המייל שאיתה הזדהית: {session.user?.email}</div>
        )
    }

    const buttons = user.gates_access.map(({ gate_id, gate }) =>
        (<GateButton key={gate_id} name={gate.name!} gate_id={gate.id!.toString()} />)
    )

    return <>
        {buttons}
        חדש: חייג לשער
        <a href="tel:+97233821001" style={{ justifyItems: "center"}}>
            03-3821001
            <Image src="/phone.svg" className="dark:invert" width={30} height={30} alt="חייג" />
        </a>
    </>
}


