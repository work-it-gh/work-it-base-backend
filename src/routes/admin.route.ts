import { Router } from "express";
import {
  assignServiceToWorker,
  getAllActiveServices,
  getAllAssignedServices,
  getAllCompletedServices,
} from "../controllers";
import { isAdmin } from "../middleware";

export const AdminRouter = Router();

AdminRouter.post("/admin/service", isAdmin, assignServiceToWorker);

AdminRouter.get("/admin/services/complete", isAdmin, getAllCompletedServices);

AdminRouter.get("/admin/services/active", isAdmin, getAllActiveServices);

AdminRouter.get("/admin/services/assigned", isAdmin, getAllAssignedServices);
