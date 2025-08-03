import { Schema, model, Document } from "mongoose";

export interface IFuelPrice extends Document {
        corriente: number;
        extra: number;
}

const fuelPriceSchema = new Schema<IFuelPrice>({
        corriente: { type: Number, default: 0 },
        extra: { type: Number, default: 0 },
});

export const FuelPrice = model<IFuelPrice>("FuelPrice", fuelPriceSchema);
