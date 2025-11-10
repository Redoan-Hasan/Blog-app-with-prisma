import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginWithEmailPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authServices.loginWithEmailPassword(email, password);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message || "Invalid credentials",
        });
    }
};

export const authController = {
    loginWithEmailPassword,
};
