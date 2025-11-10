import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
    console.log(result);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUserById(Number(req.params.id));
    console.log(result);
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.updateUser(Number(id), req.body);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await userServices.deleteUser(Number(id));
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const userController = {
  createUser,
  getAllFromDB,
  getUserById,
  updateUser,
  deleteUser,
};
