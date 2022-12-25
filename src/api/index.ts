import { Router } from "express";
import healthCheckRouter from "./healthCheck";

export default (): Router => {
  const app = Router();
  app.use("/", healthCheckRouter);
  return app;
};
