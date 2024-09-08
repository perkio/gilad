"use client";

import React from "react";
import { useState } from "react";
import toast from 'react-hot-toast';

interface IProps {
  title: string;
  action: () => Promise<void>;
}

export default function RoundButton({ title, action }: IProps) {
  const [isPressed, setPressed] = useState(false);
  async function onPressed() {
    setPressed(true);
    await action();
    await new Promise(res => setTimeout(res, 1000))
    setPressed(false);
  }

  const notify = async () => {
    await toast.promise(onPressed(), {
      loading: "משדר...",
      error: "שגיאה",
      success: "פותח"
    })
  }
  return (
    <button onClick={notify} className={`round-button ${isPressed ? "pressed" : ""}`}>{title}</button>
  );
}
