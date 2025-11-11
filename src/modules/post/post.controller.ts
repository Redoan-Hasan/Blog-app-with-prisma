import { Request, Response } from "express";
import { postServices } from "./post.services";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.createPost(req.body);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await postServices.getAllPosts({
      page,
      limit,
      search,
      isFeatured,
      tags,
    });
    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await postServices.getPostById(Number(req.params.id));
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getPostStats = async (req: Request, res: Response) => {
  try {
    const result = await postServices.getPostStats();
    res.status(200).json({
      success: true,
      message: "Post statistics fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  getPostStats,
};
