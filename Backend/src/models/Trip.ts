import { Schema, model, Document } from "mongoose";

export interface ITrip extends Document {
        userId: Schema.Types.ObjectId;
        vehicleId: Schema.Types.ObjectId;
        kilometers: number;
        gallons: number;
        createdAt: Date;
}

const tripSchema = new Schema<ITrip>({
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
        kilometers: { type: Number, required: true },
        gallons: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
});

export const Trip = model<ITrip>("Trip", tripSchema);
