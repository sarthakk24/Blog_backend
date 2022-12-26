import { NextFunction, Request, Response } from "express";
import Keywords from "../../../models/sql/keywords";
import Posts from "../../../models/sql/posts";
import User from "../../../models/sql/user";

export const createPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: {
        username: "shockwave",
      },
    });

    if (!user) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    const currentPost = await Posts.create({
      title: "testPost",
      content: "test content",
      likes: 0,
      userId: user.dataValues.id,
    });

    await Keywords.create({
      keyword: "test keyword",
      postId: currentPost.dataValues.id,
    });

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
