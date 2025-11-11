import { Prisma, Post } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const post = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return post;
};

const getAllPosts = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
}): Promise<{
  data: Post[];
  meta: { page: number; limit: number; total: number; totalPage: number };
}> => {
  //   const posts = await prisma.post.findMany({
  //     include: {
  //       author: {
  //         select: {
  //           id: true,
  //           name: true,
  //           email: true,
  //         },
  //       },
  //     },
  //   });
  console.log(tags);
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      isFeatured !== undefined && {
        isFeatured,
      },
      tags && tags.length > 0 && { tags: { hasSome: tags } },
    ].filter(Boolean),
  };

  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where,
  });
  const totalPosts = await prisma.post.count({ where });
  return {
    data: posts,
    meta: {
      page,
      limit,
      total: totalPosts,
      totalPage: Math.ceil(totalPosts / limit),
    },
  };
};

const getPostById = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    return await tx.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  });
};

const getPostStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const stats = await tx.post.aggregate({
      _count: true,
      _avg: { views: true },
      _max: { views: true },
      _min: { views: true },
      _sum: {views: true},
    });
    const featuredCount = await tx.post.count({
      where: { isFeatured: true },
    });
    const last7DaysPosts = await tx.post.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });
    return {
      stats: {
        totalPosts: stats._count,
        avgViews: stats._avg.views,
        maxViews: stats._max.views,
        minViews: stats._min.views,
        sumViews: stats._sum.views,
      },
      featured:{
        count : featuredCount,
      },
      last7Days:{
        count:last7DaysPosts,
      }
    };
  });
};

export const postServices = {
  createPost,
  getAllPosts,
  getPostById,
  getPostStats,
};
