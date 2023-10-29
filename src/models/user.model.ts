import { Schema, model } from "mongoose";

import { IUserSchema } from "../../types";

const UserSchema = new Schema<IUserSchema>({
  email: { type: String },
  phoneNumber: { type: String },
  accountVerified: { type: Boolean },
  password: { type: String },
});

export const UserModel = model("user", UserSchema);
