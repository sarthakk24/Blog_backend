import { Router } from "express";
import { handleLogin } from "./controllers/login.service";
import { handleProfileView } from "./controllers/profileView.service";
import { handleSignOut } from "./controllers/signup.service";

const userRouter = Router();

userRouter.post("/login", handleLogin);
userRouter.post("/signup", handleSignOut);

userRouter.get("/view/:id", handleProfileView);

export default userRouter;
