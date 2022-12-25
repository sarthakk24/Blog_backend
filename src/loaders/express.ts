import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import config from "../config/config";
import routes from "../api/index";

export default ({ app }: { app: express.Application }): void => {
  app.use(cors());

  app.use(express.json());

  app.use(config.api.prefix, routes());

  //when we use next(err) it will go to error handling middleware and it will catch error and send response.
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "❌ Unknown Error Occurred !! ",
    });
  });
};
