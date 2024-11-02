"use server";

import { auth } from "../auth";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { withValidation } from 'next-server-action-validation';
import { UserInfoSchema } from "./user-info-schema";

export const updateUserInfo = withValidation(UserInfoSchema, async (data) => {
    const session = await auth();
    if (!session?.user?.id) {
        throw Error("Unauthorized");
    }

    const userId = session.user.id;
    await prisma.userInfo.upsert({
        where: {
            userId
        },
        update: {
            ...data
        },
        create: {
            ...data,
            user: {
                connect: {
                    id: userId,
                }
            }
        }
    });

    revalidatePath('/');
});
