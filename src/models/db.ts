import mongoose from "mongoose";

import { config } from "../config";

const databaseUrl = config.DATABASE_URL;

export const connectDb = async () => {
  return await mongoose.connect(databaseUrl);
};
