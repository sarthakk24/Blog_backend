import { NextFunction, Request, Response } from "express";
import Likes from "../models/sql/likes";
import Posts from "../models/sql/posts";
import User from "../models/sql/user";

export const handleLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: {
        username: "two",
      },
    });

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    const { postId } = req.body;

    const post = await Posts.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw {
        statusCode: 404,
        message: "Post not found",
      };
    }

    const liked = await Likes.findOne({
      where: {
        postId,
        userId: user.dataValues.id,
      },
    });

    if (liked) {
      throw {
        statusCode: 400,
        message: "you have already liked",
      };
    }

    await Likes.create({
      postId,
      userId: user.dataValues.id,
    });

    res.status(200).json({
      success: true,
      message: `You liked `,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};

export const handleUnlike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: {
        username: "two",
      },
    });

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    const { postId } = req.body;

    const post = await Posts.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw {
        statusCode: 404,
        message: "Post not found",
      };
    }

    await Likes.destroy({
      where: {
        postId,
        userId: user.dataValues.id,
      },
    });

    res.status(200).json({
      success: true,
      message: `You unlike `,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};
