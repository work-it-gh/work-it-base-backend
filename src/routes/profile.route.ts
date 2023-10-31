import { Router } from "express";

import { isAuthenticated } from "../middleware";
import {
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
} from "../controllers";

export const ProfileRouter = Router();

ProfileRouter.post("/user/profile", isAuthenticated, createProfile);

ProfileRouter.get("/user/profile", isAuthenticated, getProfile);

ProfileRouter.put("/user/profile", isAuthenticated, updateProfile);

ProfileRouter.delete("/user/profile", isAuthenticated, deleteProfile);
