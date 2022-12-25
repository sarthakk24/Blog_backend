import { Router } from "express";
import healthCheckRouter from "./healthCheck";
import authRouter from "./users/routes";

export default (): Router => {
  const app = Router();

  app.use("/auth", authRouter);
  app.use("/", healthCheckRouter);
  return app;
};
