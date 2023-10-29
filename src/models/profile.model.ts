import { Schema, model } from "mongoose";

import { IProfileSchema } from "../../types";

const ProfileSchema = new Schema<IProfileSchema>({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  age: { type: Number },
  averageRating: { type: Number },
  username: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  role: { type: String, enum: ["cleaner", "electrician", "client"] },
  profilePictureUrl: { type: String },
});

export const ProfileModel = model("profile", ProfileSchema);
