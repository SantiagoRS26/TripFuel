import { User, IUser } from "../models/User";

export class UserRepository {
	async create(data: { email: string; password: string }): Promise<IUser> {
		return User.create(data);
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return User.findOne({ email });
	}

	async findById(id: string): Promise<IUser | null> {
		return User.findById(id);
	}

	async updateFuelPrices(
		userId: string,
		prices: { corriente: number; extra: number }
	): Promise<IUser | null> {
		return User.findByIdAndUpdate(
			userId,
			{ fuelPrices: prices },
			{ new: true }
		);
	}
}
