import { NextFunction, Request, Response } from "express";

const handleView = async (id: any) => {
  console.log(`Profile viewed of user : ${id}`);
};

export const handleProfileView = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    handleView(req.params.id);
    res.status(200).json({
      success: true,
      message: `Profile view of user : ${req.params.id} successful`,
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
