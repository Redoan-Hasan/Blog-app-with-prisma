import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async(payload:Prisma.UserCreateInput): Promise<User> =>{
    const user = await prisma.user.create({
        data: payload
      });
    return user;
};

const getAllFromDB = async() =>{
    const result = await prisma.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            createdAt:true,
            updatedAt:true,
            role:true,
            status:true,
            phone:true,
            picture:true,
            posts: true
        }
    });
    return result;
}

const getUserById = async(id:number) =>{
    const result = await prisma.user.findUnique({
        where: { id },
        select:{
            id:true,
            name:true,
            email:true,
            createdAt:true,
            updatedAt:true,
            role:true,
            status:true,
            phone:true,
            picture:true,
        }
    });
    return result;
}

export const userServices = {
    createUser,
    getAllFromDB,
    getUserById,
};