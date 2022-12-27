import { Router } from "express";
import { validateJwt } from "../middlewares/verify-jwt";
import commentsRouter from "./comments/routes";
import healthCheckRouter from "./healthCheck";
import { handleLike, handleUnlike } from "./interaction.service";
import postsRouter from "./posts/routes";
import userRouter from "./users/routes";

export default (): Router => {
  const app = Router();

  app.use("/posts", postsRouter);
  app.use("/user", userRouter);
  app.use("/", healthCheckRouter);
  app.use("/comments", commentsRouter);
  app.use("/like", validateJwt, handleLike);
  app.use("/unlike", validateJwt, handleUnlike);
  return app;
};
