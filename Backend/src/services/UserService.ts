import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserRepository } from "../repositories/UserRepository";
import { UserRole } from "../models/User";
import { VehicleService } from "./VehicleService";

const SALT_ROUNDS = 10;

export class UserService {
        private repo = new UserRepository();
        private vehicleSvc = new VehicleService();

        async register(email: string, plainPassword: string) {
                const existing = await this.repo.findByEmail(email);
                if (existing) throw new Error("Email already in use");

                const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
                const user = await this.repo.create({
                        email,
                        password: hash,
                        role: "user",
                });
                await this.vehicleSvc.ensureDefaultVehicle(user.id);
                const token = this.signToken(user.id, user.role);
                return { user, token };
        }

        async login(email: string, plainPassword: string) {
                const user = await this.repo.findByEmail(email);
                if (!user) throw new Error("Invalid credentials");

		const valid = await bcrypt.compare(plainPassword, user.password);
		if (!valid) throw new Error("Invalid credentials");

                await this.vehicleSvc.ensureDefaultVehicle(user.id);
                const token = this.signToken(user.id, user.role);
                return { user, token };
        }

        async me(userId: string) {
                const user = await this.repo.findById(userId);
                if (!user) throw new Error("Usuario no encontrado");
                return {
                        id: user.id,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        role: user.role,
                };
        }

	async findOrCreateByGoogle(googleId: string, email: string) {
                let user = await this.repo.findByGoogleId(googleId);
                if (user) {
                        await this.vehicleSvc.ensureDefaultVehicle(user.id);
                        return user;
                }

		user = await this.repo.findByEmail(email);
		if (user) {
                        const linked = await this.repo.linkGoogleId(user.id, googleId);
                        await this.vehicleSvc.ensureDefaultVehicle(linked!.id);
                        return linked;
                }

                const created = await this.repo.create({
                        email,
                        googleId,
                        password: "",
                        role: "user",
                });
                await this.vehicleSvc.ensureDefaultVehicle(created.id);
                return created;
        }

        private signToken(userId: string, role: UserRole) {
                return jwt.sign({ userId, role }, config.JWT_SECRET, {
                        expiresIn: "7d",
                });
        }

        public generateToken(userId: string, role: UserRole) {
                return this.signToken(userId, role);
        }
}
