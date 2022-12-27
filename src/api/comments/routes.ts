import { Router } from "express";
import { validateJwt } from "../../middlewares/verify-jwt";
import { createComments } from "./controllers/create.service";
import deleteComments from "./controllers/delete.service";
import {
  handleAllComments,
  handleSpecificComment,
} from "./controllers/get.service";
import updateComments from "./controllers/update.service";

const commentsRouter = Router();

commentsRouter.get("/", handleAllComments);
commentsRouter.get("/:id", handleSpecificComment);

commentsRouter.post("/", validateJwt, createComments);

commentsRouter.delete("/:id", validateJwt, deleteComments);

commentsRouter.put("/:id", validateJwt, updateComments);
export default commentsRouter;
