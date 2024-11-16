"use client";

import { usePathname } from "next/navigation";
import { NavigateButton } from "./navigate-button";
import React from "react";

export function NavButton() {
  const pathname = usePathname();
  switch (pathname) {
    case "/":
      return <NavigateButton className="btn" path="/admin">ניהול</NavigateButton>;
    default:
      return <NavigateButton className="btn" path={"/"}>ראשי</NavigateButton>;
  }
}
