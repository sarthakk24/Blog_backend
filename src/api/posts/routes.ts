import { Router } from "express";
import createPosts from "./controllers/create.service";
import deletePosts from "./controllers/delete.service";
import { handleAllPosts, handleSpecificPosts } from "./controllers/get.service";
import updatePosts from "./controllers/update.service";

const postsRouter = Router();

postsRouter.get("/", handleAllPosts);
postsRouter.get("/:id", handleSpecificPosts);

postsRouter.post("/create", createPosts);

postsRouter.delete("/:id", deletePosts);

postsRouter.put("/:id", updatePosts);
export default postsRouter;
