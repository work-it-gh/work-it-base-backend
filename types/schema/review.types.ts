import { Document, Schema } from "mongoose";

export interface IReviewSchema extends Document {
  serviceId: Schema.Types.ObjectId;
  message: string;
  rating: number;
}
