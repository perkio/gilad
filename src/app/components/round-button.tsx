"use client";

import React from "react";
import { useState } from "react";

interface IProps {
  title: string;
  action: () => Promise<void>;
}

export default function RoundButton({ title, action }: IProps) {
  const [isPressed, setPressed] = useState(false);
  async function onPressed() {
    setPressed(true);
    await action();
    await new Promise(res => setTimeout(res, 500))
    setPressed(false);
  }
  return (
    <button onClick={onPressed} className={`round-button ${isPressed ? "pressed" : ""}`}>{title}</button>
  );
}
