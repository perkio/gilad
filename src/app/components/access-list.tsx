import prisma from "../db";
import { AccessTable } from "./access-table";
import React from "react";

export async function AccessList() {
    const results = await prisma.users.findMany({
        include: {
            gates_access: {
                include: {
                    gates: true
                }
            },
        },
    });

    return <AccessTable results={results} ></AccessTable>;
}



