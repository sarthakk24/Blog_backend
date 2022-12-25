import { NextFunction, Request, Response } from "express";

export const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("signIn");
    res.status(200).json({
      success: true,
      message: "SignIn successful",
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
