import { Schema, model, Document } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
        email: string;
        password: string;
        googleId: string;
        role: UserRole;
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
                role: {
                        type: String,
                        enum: ["user", "admin"],
                        default: "user",
                },
                fuelPrices: {
                        corriente: { type: Number, default: 0 },
                        extra: { type: Number, default: 0 },
                },
        },
        { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
