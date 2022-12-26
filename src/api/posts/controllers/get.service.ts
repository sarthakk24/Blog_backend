import { NextFunction, Request, Response } from "express";
import User from "../../../models/sql/user";

export const handleAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await User.findAll();
    res.status(200).json({
      success: true,
      message: `All posts request successful`,
      data,
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
