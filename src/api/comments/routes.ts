import { Router } from "express";
import { createComments } from "./controllers/create.service";
import deleteComments from "./controllers/delete.service";
import {
  handleAllComments,
  handleSpecificComment,
} from "./controllers/get.service";

const commentsRouter = Router();

commentsRouter.get("/", handleAllComments);
commentsRouter.get("/:id", handleSpecificComment);

commentsRouter.post("/", createComments);

commentsRouter.delete("/:id", deleteComments);
export default commentsRouter;
