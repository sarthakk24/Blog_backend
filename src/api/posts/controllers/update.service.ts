import { NextFunction, Request, Response } from "express";
import Comments from "../../../models/sql/comments";
import Keywords from "../../../models/sql/keywords";
import Posts from "../../../models/sql/posts";
import User from "../../../models/sql/user";

export const updatePosts = async (
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

    const { id } = req.params;
    const { title, content, keywords } = req.body;

    const post = await Posts.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw {
        statusCode: 404,
        message: "Post Not Found ",
      };
    }

    if (user.dataValues.id !== post.dataValues.userId) {
      throw {
        statusCode: 401,
        message: "You are not authenticated to update this post",
      };
    }

    if (keywords.length > 0) {
      const existingKeywords = await Keywords.findAll({
        where: {
          postId: id,
        },
      });

      if (existingKeywords.length > 0) {
        existingKeywords.forEach(async (el) => {
          await Keywords.destroy({
            where: {
              id: el.dataValues.id,
            },
          });
        });
      }

      await keywords.forEach(async (el: string) => {
        await Keywords.create({
          keyword: el,
          postId: post.dataValues.id,
        });
      });
    }

    await Posts.update(
      { title, content },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: `You updated the post`,
    });

    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};

export default updatePosts;
