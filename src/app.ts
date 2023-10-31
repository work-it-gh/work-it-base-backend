import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { AuthRouter, ProfileRouter } from "./routes";
import { isAuthenticated, userIsClient } from "./middleware";
import { ServiceRouter } from "./routes/service.route";

export const createExpressApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(morgan("dev"));

  app.get("/", (_, res) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to the work it api base system",
    });
  });

  const BASE_API_PATH = "/api/v1";
  app.use(BASE_API_PATH, AuthRouter);
  app.use(BASE_API_PATH, isAuthenticated, ProfileRouter);
  app.use(BASE_API_PATH, isAuthenticated, userIsClient, ServiceRouter);

  return app;
};
