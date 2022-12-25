import { Router } from "express";
import { handleSignIn } from "./controllers/signin.service";
import { handleSignOut } from "./controllers/signup.service";

const authRouter = Router();

authRouter.post("/signin", handleSignIn);
authRouter.post("/signout", handleSignOut);

export default authRouter;
