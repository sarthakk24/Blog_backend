import { Router } from "express";
import { handleLogin } from "./controllers/login.service";
import { handleSignOut } from "./controllers/signup.service";

const authRouter = Router();

authRouter.post("/login", handleLogin);
authRouter.post("/signup", handleSignOut);

export default authRouter;
