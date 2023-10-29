import { Router } from "express";
import {
  changePassword,
  deleteAccount,
  login,
  register,
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
