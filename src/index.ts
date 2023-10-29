import dotenv from "dotenv";

const configureEnv = () => {
  if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
  } else {
    dotenv.config({ path: ".env.development" });
  }
};
configureEnv();

import http from "http";

import { connectDb } from "./models";

import { config } from "./config";
import { createExpressApp } from "./app";

const app = createExpressApp();
const server = http.createServer(app);

const port = parseInt(config.PORT, 10);

connectDb()
  .then((_) => {
    console.log("database connection successful");
    server.listen(port, () => {
      console.log(`server ready at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed");
    console.log(err);
  });
