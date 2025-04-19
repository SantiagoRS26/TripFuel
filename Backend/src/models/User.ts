import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
	email: string;
	password: string;
	googleId: string;
	fuelPrices: {
		corriente: number;
		extra: number;
	};
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String },
		googleId: { type: String, unique: true, sparse: true },
		fuelPrices: {
			corriente: { type: Number, default: 0 },
			extra: { type: Number, default: 0 },
		},
	},
	{ timestamps: true }
);

export const User = model<IUser>("User", userSchema);
