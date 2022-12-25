import { NextFunction, Router, Request, Response } from "express";

const healthCheckRouter = Router();
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

healthCheckRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ success: true, message: "🛠️ API v1 working!" });
      next();
    } catch (e) {
      res
        .status(503)
        .json({ success: false, message: "🚫 API Health Check Failed" });
    }
  }
);

export default healthCheckRouter;
