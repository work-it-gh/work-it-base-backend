import { Document } from "mongoose";

export interface IProfileSchema extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  averageRating: number;
  username: string;
}
