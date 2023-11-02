import { Router } from "express";
import {
  createClientService,
  deleteClientService,
  findServiceWorker,
  getAllClientServices,
  updateClientService,
} from "../controllers";
import { userIsClient } from "../middleware";

export const ServiceRouter = Router();

ServiceRouter.post("/client/service", userIsClient, createClientService);

ServiceRouter.get("/client/service", userIsClient, getAllClientServices);

ServiceRouter.get(
  "/client/service/:serviceId",
  userIsClient,
  findServiceWorker
);

ServiceRouter.delete(
  "/client/service/:serviceId",
  userIsClient,
  deleteClientService
);

ServiceRouter.put(
  "/client/service/:serviceId",
  userIsClient,
  updateClientService
);
