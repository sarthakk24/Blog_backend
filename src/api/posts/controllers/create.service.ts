import { NextFunction, Request, Response } from "express";

export const createPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("post created");

    res.status(200).json({
      success: true,
      message: `You created a post `,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};

export default createPosts;
