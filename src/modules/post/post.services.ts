import { Prisma, Post } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const post = await prisma.post.create({
    data: payload,
  });
  return post;
};

export const postServices = {
  createPost,
};
