import { NextFunction, Request, Response } from "express";
import Comments from "../../../models/sql/comments";
import Posts from "../../../models/sql/posts";
import User from "../../../models/sql/user";

export const createComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user,
      },
    });

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    const { content, postId } = req.body;

    const post = await Posts.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw {
        statusCode: 404,
        message: "Post Not found",
      };
    }

    const createdComment = await Comments.create({
      content,
      userId: user.dataValues.id,
      postId: post.dataValues.id,
    });

    res.status(200).json({
      success: true,
      message: `You created a comment `,
      data: createdComment,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};

export default createComments;
