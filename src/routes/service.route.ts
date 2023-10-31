import { Router } from "express";
import {
  createClientService,
  deleteClientService,
  findServiceWorker,
  getAllClientServices,
  updateClientService,
} from "../controllers";

export const ServiceRouter = Router();

ServiceRouter.post("/service/client", createClientService);

ServiceRouter.get("/service/client", getAllClientServices);

ServiceRouter.get("/service/client/:serviceId", findServiceWorker);

ServiceRouter.delete("/service/client/:serviceId", deleteClientService);

ServiceRouter.put("/service/client/:serviceId", updateClientService);
