import React from "react";

import { auth } from "../../../auth"
import prisma from "../../../db";
import { redirect } from "next/navigation";
import BackButton from "../../../components/back-button";
import { isAdmin } from "../../../is-admin";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/");
  }

  if (!await isAdmin(session.user.id)) {
    redirect("/");
  }

  const user = await prisma.users.findUniqueOrThrow({
    where: {
        id: Number(params.id),
    },
    include: {
        gates_access: {
            include: {
                gates: true
            }
        }
    }
  });

  const allGates = await prisma.gates.findMany();

  const GateCheckboxes = () => {
    return allGates.map((gate) => (
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
    
    if (allowedGateIds.length) {
      await prisma.gates_access.createMany({
        skipDuplicates: true,
        data: allowedGateIds.map(id => ({ 
          gate_id: id,
          user_id: Number(params.id),
        }))
      });
    }

    await prisma.gates_access.deleteMany({
      where: {
        gate_id: {
          notIn: allowedGateIds
        },
        user_id: Number(params.id),
      }
    });

    redirect('/admin')
  }

  const User = () => {    
    return (<>
      <img src={user.image ?? ""}></img>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
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