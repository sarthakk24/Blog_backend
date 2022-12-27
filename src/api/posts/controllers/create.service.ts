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
    console.log(req.user);

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

    const { title, content, keywords } = req.body;

    if (!title) {
      throw {
        statusCode: 400,
        message: "Title cannot be empty",
      };
    }

    const currentPost = await Posts.create({
      title,
      content,
      userId: user.dataValues.id,
    });

    if (keywords?.length > 0) {
      await keywords.forEach(async (el: string) => {
        await Keywords.create({
          keyword: el,
          postId: currentPost.dataValues.id,
        });
      });
    }

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
