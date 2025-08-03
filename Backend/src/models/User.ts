import { Schema, model, Document } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
        email: string;
        password: string;
        googleId: string;
        role: UserRole;
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
        },
        { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
