"use client";

import { Prisma } from ".prisma/client";
import { useRouter } from "next/navigation";
import {getUsersWithGates } from "../query/get-users-with-gates";

import React from "react";

export function AccessTable({ results }: { results: Prisma.PromiseReturnType<typeof getUsersWithGates> }) {
    const router = useRouter()

    const rows = results.map(({ id, name, email, gates_access, info }) => (
        <tr key={id}>
            <td data-label="אימייל">{email}</td>
            <td data-label="שם">{info ? `${info.firstName} ${info.lastName}` : name}</td>
            <td data-label="בניין">{info ? `הגלעד ${info.building}` : '-'}</td>
            <td data-label="דירה">{info ? `${info.apartment}` : '-'}</td>
            <td data-label="טלפון">{info ? `${info.phonenumber}` : '-'}</td>
            <td data-label="הרשאות">{gates_access.length ? gates_access.map(g => g.gate.name).join(", ") : "אין"}</td>
            <td data-label="פעולות"><button className="btn" onClick={() => router.push(`/admin/user/${id}`)}>ערוך</button></td>
        </tr>
    ));

    return (
        <table className="table">
            <caption>ניהול משתמשים</caption>
            <thead>
                <tr>
                    <th scope="col">אימייל</th>
                    <th scope="col">שם</th>
                    <th scope="col">בניין</th>
                    <th scope="col">דירה</th>
                    <th scope="col">טלפון</th>
                    <th scope="col">הרשאות</th>
                    <th scope="col">פעולות</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
