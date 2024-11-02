import prisma from "../db";

export async function allGates() {
    const allGates = await prisma.gate.findMany();
    return allGates;
}

export async function getUserWithGates(id: string) {
    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            info: true,
            gates_access: {
                include: {
                    gates: true,
                }
            },
        },
    });

    return result;
}


export async function getUsersWithGates() {
    const results = await prisma.user.findMany({
        include: {
            info: true,
            gates_access: {
                include: {
                    gates: true
                }
            },
        },
    });

    return results;
}
