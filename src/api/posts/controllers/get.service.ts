import { NextFunction, Request, Response } from "express";
import { where } from "sequelize";
import Posts from "../../../models/sql/posts";

export const handleAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Posts.findAll();
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

export const handleSpecificPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Posts.findOne({
      where: {
        id: `${req.params.id}`,
      },
    });

    if (!data) {
      throw {
        statusCode: 404,
        message: "Post Not found",
      };
    }

    res.status(200).json({
      success: true,
      message: `Post of id : ${data.dataValues.id} was fetched`,
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
