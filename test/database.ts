import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const mongod = new MongoMemoryServer();

export async function connect() {
  const uri = mongod.getUri();

  await mongoose.connect(uri);
}

export async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

export async function clear() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}
