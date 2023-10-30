import { Router } from "express";
import {
  deleteAccount,
  getAccount,
  login,
  register,
  updateAccount,
} from "../controllers";
import { isAuthenticated } from "../middleware";

export const AuthRouter = Router();

AuthRouter.post("/auth/register", register);

AuthRouter.post("/auth/login", login);

AuthRouter.get("/auth/user", isAuthenticated, getAccount);

AuthRouter.put("/auth/user", isAuthenticated, updateAccount);

AuthRouter.delete("/auth/user", isAuthenticated, deleteAccount);
