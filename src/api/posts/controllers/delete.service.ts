import { NextFunction, Request, Response } from "express";
import Comments from "../../../models/sql/comments";
import Keywords from "../../../models/sql/keywords";
import Posts from "../../../models/sql/posts";
import User from "../../../models/sql/user";

export const deletePosts = async (
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

    const { id } = req.params;

    const postData = await Posts.findOne({
      where: {
        id,
      },
    });

    if (!postData) {
      throw {
        statusCode: 404,
        message: "Post Not Found ",
      };
    }

    if (user.dataValues.id !== postData.dataValues.userId) {
      throw {
        statusCode: 401,
        message: "You are not authenticated to delete this Post",
      };
    }

    await Comments.destroy({
      where: {
        postId: id,
      },
    });

    await Keywords.destroy({
      where: {
        postId: id,
      },
    });

    await Posts.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: `You deleted a post`,
    });
    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};

export default deletePosts;
