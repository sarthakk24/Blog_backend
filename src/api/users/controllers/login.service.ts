import { NextFunction, Request, Response } from "express";
import User from "../../../models/sql/user";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred !! ",
      data: err.data,
    });
  }
};
