import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import User from "../../../models/sql/user";

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { first_name, last_name, email, username, password } = req.body;

    const data = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (data) {
      if (data.dataValues.username === username) {
        throw {
          statusCode: 400,
          message: "username already exists",
        };
      }
      if (data.dataValues.email === email) {
        throw {
          statusCode: 400,
          message: "email already exists",
        };
      }
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      username,
      password,
    });

    res.status(200).json({
      success: true,
      message: "Thank you for signing up",
      data: newUser,
    });

    next();
    console.log("signUp");

    next();
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred !! ",
      data: err.data,
    });
  }
};
