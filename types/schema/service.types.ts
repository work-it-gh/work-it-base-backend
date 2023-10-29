import { Document, Schema } from "mongoose";

export interface IServiceSchema extends Document {
  clientId: Schema.Types.ObjectId;
  serviceProviderId: Schema.Types.ObjectId;
  serviceTitle: string;
  serviceDescription: string;
  serviceDate: Date;
  serviceStatus: string;
}
