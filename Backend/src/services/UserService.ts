import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserRepository } from "../repositories/UserRepository";

const SALT_ROUNDS = 10;

export class UserService {
	private repo = new UserRepository();

	async register(email: string, plainPassword: string) {
		const existing = await this.repo.findByEmail(email);
		if (existing) throw new Error("Email already in use");

		const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
		const user = await this.repo.create({ email, password: hash });
		const token = this.signToken(user.id);
		return { user, token };
	}

	async login(email: string, plainPassword: string) {
		const user = await this.repo.findByEmail(email);
		if (!user) throw new Error("Invalid credentials");

		const valid = await bcrypt.compare(plainPassword, user.password);
		if (!valid) throw new Error("Invalid credentials");

		const token = this.signToken(user.id);
		return { user, token };
	}

	async me(userId: string) {
		const user = await this.repo.findById(userId);
		if (!user) throw new Error("Usuario no encontrado");
		return {
			id: user.id,
			email: user.email,
			fuelPrices: user.fuelPrices,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}

	async findOrCreateByGoogle(googleId: string, email: string) {
		let user = await this.repo.findByGoogleId(googleId);
		if (user) return user;

		user = await this.repo.findByEmail(email);
		if (user) {
			return this.repo.linkGoogleId(user.id, googleId);
		}

		return this.repo.create({ email, googleId, password: "" });
	}

	async updateFuelPrices(
		userId: string,
		prices: { corriente?: number; extra?: number }
	) {
		const updated = await this.repo.updateFuelPrices(userId, {
			corriente: prices.corriente ?? 0,
			extra: prices.extra ?? 0,
		});
		if (!updated) throw new Error("Usuario no encontrado");
		return {
			id: updated.id,
			email: updated.email,
			fuelPrices: updated.fuelPrices,
		};
	}

	private signToken(userId: string) {
		return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: "7d" });
	}

	public generateToken(userId: string) {
		return this.signToken(userId);
	}
}
