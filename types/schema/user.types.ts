import { Document } from "mongoose";

export interface IUserSchema extends Document {
  username: string;
  email: string;
  phoneNumber: string;
  accountVerified: boolean;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  profilePictureUrl: string;
  role: string;
}
