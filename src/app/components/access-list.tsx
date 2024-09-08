import { getUsersWithGates } from "../query/get-users-with-gates";
import { AccessTable } from "./access-table";
import React from "react";

export async function AccessList() {
    const results = await getUsersWithGates();
    return <AccessTable results={results} ></AccessTable>;
}



