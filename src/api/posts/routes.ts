import { Router } from "express";
import yupValidator from "../../middlewares/validator";
import { validateJwt } from "../../middlewares/verify-jwt";
import {
  yupCreatePostsSchema,
  yupObjIdSchema,
  yupSignupSchema,
} from "../../models/schemas/schema";
import createPosts from "./controllers/create.service";
import deletePosts from "./controllers/delete.service";
import { handleAllPosts, handleSpecificPosts } from "./controllers/get.service";
import updatePosts from "./controllers/update.service";

const postsRouter = Router();

postsRouter.get("/", handleAllPosts);
postsRouter.get(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  handleSpecificPosts
);

postsRouter.post(
  "/create",
  yupValidator("body", yupCreatePostsSchema),
  validateJwt,
  createPosts
);

postsRouter.delete(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  validateJwt,
  deletePosts
);

postsRouter.put(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  validateJwt,
  updatePosts
);
export default postsRouter;
