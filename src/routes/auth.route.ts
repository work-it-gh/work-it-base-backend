import { Router } from "express";
import {
  changePassword,
  createProfile,
  deleteAccount,
  getProfile,
  login,
  register,
  updateProfile,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware";

export const AuthRouter = Router();

AuthRouter.post("/auth/register", register);

AuthRouter.post("/auth/login", login);

// AuthRouter.post(
//   "/auth/passport/login",
//   passport.authenticate("local", { session: false }),
//   passportLogin
// );

// AuthRouter.get(
//   "/auth/changePassword",
//   passport.authenticate("jwt", { session: false }),
//   changePassword
// );

AuthRouter.post("/auth/changePassword", isAuthenticated, changePassword);

AuthRouter.delete("/auth/delete", isAuthenticated, deleteAccount);

AuthRouter.post("/auth/profile", isAuthenticated, createProfile);

AuthRouter.put("/auth/profile", isAuthenticated, updateProfile);

AuthRouter.get("/auth/profile", isAuthenticated, getProfile);
