import { Response } from "express";
import { VehicleService } from "../services/VehicleService";
import { AuthRequest } from "../middleware/auth";

const service = new VehicleService();

export class VehicleController {
    static async create(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { name, licensePlate } = req.body;
            const vehicle = await service.create(req.userId!, name, licensePlate);
            res.status(201).json(vehicle);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async list(req: AuthRequest, res: Response): Promise<void> {
        try {
            const vehicles = await service.list(req.userId!);
            res.json({ vehicles });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async update(req: AuthRequest, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const { name, licensePlate } = req.body;
            const vehicle = await service.update(req.userId!, id, { name, licensePlate });
            if (!vehicle) {
                res.status(404).json({ message: "Vehículo no encontrado" });
                return;
            }
            res.json(vehicle);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async delete(req: AuthRequest, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            await service.delete(req.userId!, id);
            res.status(204).end();
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
