import { NextFunction, Request, Response } from "express";
import Comments from "../../../models/sql/comments";
import Posts from "../../../models/sql/posts";
import User from "../../../models/sql/user";

export const updateComments = async (
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
    const { content } = req.body;

    const comment = await Comments.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw {
        statusCode: 404,
        message: "Comment Not Found ",
      };
    }

    if (user.dataValues.id !== comment.dataValues.userId) {
      throw {
        statusCode: 401,
        message: "You are not authenticated to update this comment",
      };
    }

    if (content) {
      const updatedComment = await Comments.update(
        { content },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        success: true,
        message: `You updated a comment `,
        data: updatedComment,
      });

      next();
    }

    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred!!",
    });
  }
};

export default updateComments;
