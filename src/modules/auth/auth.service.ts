import { prisma } from "../../config/db";

const loginWithEmailPassword = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (user.password !== password) {
        throw new Error("Invalid password");
    }

    return user;
};

export const authServices = {
    loginWithEmailPassword,
};
