import { Response } from "express";
import { TripService } from "../services/TripService";
import { AuthRequest } from "../middleware/auth";

const service = new TripService();

export class TripController {
	static async create(req: AuthRequest, res: Response): Promise<void> {
		try {
			const { kilometers, gallons } = req.body;
			const trip = await service.create(req.userId!, kilometers, gallons);
			res.status(201).json(trip);
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}

	static async list(req: AuthRequest, res: Response): Promise<void> {
		try {
			const data = await service.listWithSummary(req.userId!);
			res.json(data);
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}

	static async calculate(req: AuthRequest, res: Response): Promise<void> {
		try {
			const km = parseFloat(req.query.km as string);
			if (isNaN(km) || km <= 0) {
				res.status(400).json({ message: "Parámetro km inválido" });
				return;
			}
			const result = await service.calculate(req.userId!, km);
			res.json(result);
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}

	static async delete(req: AuthRequest, res: Response): Promise<void> {
		try {
			const tripId = req.params.id;
			await service.deleteTrip(req.userId!, tripId);
			res.status(204).end();
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}
}
