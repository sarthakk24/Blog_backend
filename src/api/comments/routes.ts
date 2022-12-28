import { Router } from "express";
import yupValidator from "../../middlewares/validator";
import { validateJwt } from "../../middlewares/verify-jwt";
import {
  yupCreateCommentsSchema,
  yupObjIdSchema,
} from "../../models/schemas/schema";
import { createComments } from "./controllers/create.service";
import deleteComments from "./controllers/delete.service";
import {
  handleAllComments,
  handleSpecificComment,
} from "./controllers/get.service";
import updateComments from "./controllers/update.service";

const commentsRouter = Router();

commentsRouter.get("/", handleAllComments);
commentsRouter.get(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  handleSpecificComment
);

commentsRouter.post(
  "/",
  yupValidator("body", yupCreateCommentsSchema),
  validateJwt,
  createComments
);

commentsRouter.delete(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  validateJwt,
  deleteComments
);

commentsRouter.put(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  validateJwt,
  updateComments
);
export default commentsRouter;
