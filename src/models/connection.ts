import { DataSource } from "typeorm";
import { Profile, User, Service } from "./entity";

import { config } from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Profile, Service],
});

export const connectDb = () => {
  return AppDataSource.initialize();
};
