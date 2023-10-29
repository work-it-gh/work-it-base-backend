import { Schema, model } from "mongoose";

import { IUserSchema } from "../../types";

const UserSchema = new Schema<IUserSchema>({
  username: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  accountVerified: { type: Boolean },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  profilePictureUrl: { type: String },
  role: { type: String, enum: ["cleaner", "electrician", "client"] },
});

export const UserModel = model("user", UserSchema);
