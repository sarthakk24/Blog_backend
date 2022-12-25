import { Router } from "express";
import healthCheckRouter from "./healthCheck";
import postsRouter from "./posts/routes";
import userRouter from "./users/routes";

export default (): Router => {
  const app = Router();

  app.use("/posts", postsRouter);
  app.use("/user", userRouter);
  app.use("/", healthCheckRouter);
  return app;
};
