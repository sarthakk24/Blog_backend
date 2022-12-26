import { NextFunction, Request, Response } from "express";
import User from "../../../models/sql/user";

export const handleSignOut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await User.create({
      first_name: "Sarthak",
      last_name: "Sachdeva",
      email: "sarthak.sachdeva.73@gmail.com",
      username: "shockwave",
      password: "shockwave",
    });
    console.log("signUp");
    res.status(200).json({
      success: true,
      message: "SignUp successful",
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
