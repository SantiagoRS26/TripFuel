import { Types } from "mongoose";
import { User, IUser } from "../models/User";

export class UserRepository {
	async create(data: Partial<IUser>): Promise<IUser> {
		return User.create(data);
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return User.findOne({ email });
	}

	async findById(id: string): Promise<IUser | null> {
		return User.findById(id);
	}

	findByGoogleId(googleId: string): Promise<IUser | null> {
		return User.findOne({ googleId });
	}

        async linkGoogleId(userId: string, googleId: string) {
                return User.findByIdAndUpdate(
                        new Types.ObjectId(userId),
                        { googleId },
                        { new: true }
                );
        }
}
