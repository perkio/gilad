import React from "react";

import { auth } from "../../../auth"
import prisma from "../../../db";
import { redirect } from "next/navigation";
import BackButton from "../../../components/back-button";
import { isAdmin } from "../../../is-admin";
import { allGates } from "../../../query/get-users-with-gates";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/");
  }

  if (!await isAdmin(session.user.id)) {
    redirect("/");
  }

  const id =  (await params).id;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
        id
    },
    include: {
        info: {
          include: {
            requestedGate: true,
          }
        },
        gates_access: {
            include: {
                gates: true
            }
        }
    }
  });

  const all = await allGates();

  const GateCheckboxes = () => {
    return all.map((gate) => (
      <div key={gate.entity_id}>
        <input
          style={{margin: '10px'}}
          type="checkbox"
          id={gate.id!.toString()}
          name="gate"
          value={gate.id!}
          defaultChecked={user.gates_access.some(({ gates }) => gates.entity_id === gate.entity_id)}
          />
        <label htmlFor={gate.id!.toString()}>{gate.name!}</label>
      </div>
    ))
  }

  async function updateUser(formData: FormData) {
    'use server'

    const allowedGateIds = formData.getAll("gate").map(Number);
    // TODO: transaction?
    if (allowedGateIds.length) {
      await prisma.gatesAccess.createMany({
        skipDuplicates: true,
        data: allowedGateIds.map(gate_id => ({ 
          gate_id,
          user_id: id,
        }))
      });
    }

    await prisma.gatesAccess.deleteMany({
      where: {
        gate_id: {
          notIn: allowedGateIds
        },
        user_id: id,
      }
    });

    redirect('/admin')
  }

  const User = () => {    
    return (<>
      <Image alt="profile" src={user.image ?? ""}/>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
      <div>{user?.info?.firstName} {user?.info?.lastName}</div>
      <div>הגלעד {user?.info?.building}</div>
      <div>דירה {user?.info?.apartment}</div>
      <div>טלפון {user?.info?.phonenumber}</div>
      <div>שער מבוקש: { user?.info?.requestedGate?.name}</div>
      
      <form action={updateUser}>
        <GateCheckboxes/>
        <BackButton className="btn">חזרה</BackButton>
        <button type="submit" className="btn">עדכן</button>
      </form>
      </>)
  }

  return (
   <User/>
  );
}