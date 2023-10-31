import { Router } from "express";
import {
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers";
import { isAuthenticated } from "../middleware";

export const AuthRouter = Router();

AuthRouter.post("/auth/register", register);

AuthRouter.post("/auth/login", login);

AuthRouter.get("/auth/user", isAuthenticated, getUser);

AuthRouter.put("/auth/user", isAuthenticated, updateUser);

AuthRouter.delete("/auth/user", isAuthenticated, deleteUser);
