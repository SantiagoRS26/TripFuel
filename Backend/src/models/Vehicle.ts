import { Schema, model, Document } from "mongoose";

export interface IVehicle extends Document {
    userId: Schema.Types.ObjectId;
    name: string;
    licensePlate: string;
    createdAt: Date;
    updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        licensePlate: { type: String, required: true },
    },
    { timestamps: true }
);

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
