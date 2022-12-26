import { Router } from "express";
import createPosts from "./controllers/create.service";
import { handleAllPosts, handleSpecificPosts } from "./controllers/get.service";

const postsRouter = Router();

postsRouter.get("/", handleAllPosts);
postsRouter.get("/:id", handleSpecificPosts);
postsRouter.post("/create", createPosts);
export default postsRouter;
