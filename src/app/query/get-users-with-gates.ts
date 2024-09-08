import prisma from "../db";

export async function getUsersWithGates() {
    const results = await prisma.users.findMany({
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
