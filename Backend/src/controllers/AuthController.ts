import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { AuthRequest } from "../middleware/auth";

const service = new UserService();

export class AuthController {
	static async signup(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const { user, token } = await service.register(email, password);
			res.status(201).json({
				user: { id: user.id, email: user.email, fuelPrices: user.fuelPrices },
				token,
			});
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}

	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const { user, token } = await service.login(email, password);
			res.json({
				user: { id: user.id, email: user.email, fuelPrices: user.fuelPrices },
				token,
			});
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}

	static async updateFuelPrices(
		req: AuthRequest,
		res: Response
	): Promise<void> {
		try {
			const { corriente, extra } = req.body;
			const user = await new UserService().updateFuelPrices(req.userId!, {
				corriente,
				extra,
			});
			res.json({ user });
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}

	static async me(req: AuthRequest, res: Response): Promise<void> {
		try {
			const userData = await new UserService().me(req.userId!);
			res.json({ user: userData });
		} catch (err: any) {
			res.status(404).json({ message: err.message });
		}
	}
}
