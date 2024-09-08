"use client";

import { useRouter } from "next/navigation";
import React from "react";

export function AccessTable({ results }: { results: ({ gates_access: ({ gates: { id: number; name: string | null; entity_id: string | null; }; } & { gate_id: number; user_id: number; })[]; } & { id: number; name: string | null; email: string | null; emailVerified: Date | null; image: string | null; })[] }) {
    const router = useRouter()

    const rows = results.map(({ id, name, email, gates_access }) => (
        <tr key={id}>
            <td data-label="מספר">{id}</td>
            <td data-label="שם">{name}</td>
            <td data-label="אימייל">{email}</td>
            <td data-label="הרשאות">{gates_access.length ? gates_access.map(g => g.gates.name).join(", ") : "אין"}</td>
            <td data-label="פעולות"><button className="btn" onClick={() => router.push(`/admin/user/${id}`)}>ערוך</button></td>
        </tr>
    ));

    return (
        <table className="table">
            <caption>ניהול משתמשים</caption>
            <thead>
                <tr>
                    <th scope="col">מספר</th>
                    <th scope="col">שם</th>
                    <th scope="col">אימייל</th>
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
