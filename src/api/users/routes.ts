import { Router } from "express";
import { handleLogin } from "./controllers/login.service";
import { handleProfileView } from "./controllers/profileView.service";
import { handleSignUp } from "./controllers/signup.service";

const userRouter = Router();

userRouter.post("/login", handleLogin);
userRouter.post("/signup", handleSignUp);
userRouter.get("/:id", handleProfileView);

export default userRouter;
