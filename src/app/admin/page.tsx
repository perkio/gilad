export const dynamic = 'force-dynamic'

import React from "react";

import { AccessList } from "../components/access-list"
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { isAdmin } from "../is-admin";

export default async function Admin() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/");
  }

  if (!await isAdmin(session.user.id)) {
    redirect("/");
  }
  
  return (
    <AccessList />
  );
}