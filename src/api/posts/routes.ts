import { Router } from "express";
import createPosts from "./controllers/create.service";
import { handleAllPosts } from "./controllers/get.service";

const postsRouter = Router();

postsRouter.get("/", handleAllPosts);
postsRouter.post("/create", createPosts);

export default postsRouter;
