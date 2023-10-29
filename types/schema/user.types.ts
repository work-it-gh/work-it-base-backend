import { Document } from "mongoose";

export interface IUserSchema extends Document {
  email: string;
  phoneNumber: string;
  accountVerified: boolean;
  password: string;
}
