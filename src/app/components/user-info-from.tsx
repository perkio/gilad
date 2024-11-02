"use client";

import React, { FormEvent, useState } from "react";
import { updateUserInfo } from "../api/update-user-info";
import { isValidationError } from 'next-server-action-validation';

export function UpdateUserInfoFrom() {
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const info = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            apartment: Number(formData.get("apartment") as string),
            building: Number(formData.get("building") as string),
            phonenumber: formData.get("phonenumber") as string,
        }

        const result = await updateUserInfo(info);

        if (isValidationError(result)) {
            setErrorMessage(result.errors[0].path + ": " + result.errors[0].message);
            return;
        }

        setErrorMessage("");
    }

    return <div>
        <div>אנא הכנס פרטים מזהים</div>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
            <label htmlFor="firstName">שם פרטי:</label>
            <input required={true} id="firstName" name="firstName" type="text"></input>

            <label htmlFor="lastName">שם משפחה:</label>
            <input required={true} id="lastName" name="lastName" type="text"></input>

            <label htmlFor="phonenumber">טלפון:</label>
            <input required={true} id="phonenumber" name="phonenumber" type="text"></input>

            <label htmlFor="building">בניין:</label>
            <select name="building" id="building">
                <option value="5">גלעד 5</option>
                <option value="7">גלעד 7</option>
                <option value="9">גלעד 9</option>
                <option value="11">גלעד 11</option>
            </select>

            <label htmlFor="apartment">דירה:</label>
            <input id="apartment" name="apartment" type="number" min={1} max={60}></input>

            <button type="submit" className="btn">שלח</button>
            <div style={{ color: "red" }}>{errorMessage}</div>
        </form>
    </div>;
}
