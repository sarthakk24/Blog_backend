import { NextFunction, Request, Response } from "express";
import { where } from "sequelize";
import Comments from "../../../models/sql/comments";

export const handleAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Comments.findAll();
    res.status(200).json({
      success: true,
      message: `All comments request successful`,
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

export const handleSpecificComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Comments.findOne({
      where: {
        id: `${req.params.id}`,
      },
    });

    if (!data) {
      throw {
        statusCode: 404,
        message: "Comment Not found",
      };
    }

    res.status(200).json({
      success: true,
      message: `comment of id : ${data.dataValues.id} was fetched`,
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
