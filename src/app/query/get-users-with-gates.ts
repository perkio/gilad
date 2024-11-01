import prisma from "../db";

export async function getUserWithGates(id: string) {
    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            gates_access: {
                include: {
                    gates: true
                }
            },
        },
    });

    return result;
}


export async function getUsersWithGates() {
    const results = await prisma.user.findMany({
        include: {
            gates_access: {
                include: {
                    gates: true
                }
            },
        },
    });

    return results;
}
