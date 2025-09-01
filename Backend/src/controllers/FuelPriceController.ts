import { Request, Response } from "express";
import { FuelPriceService } from "../services/FuelPriceService";
import { config } from "../config";

const service = new FuelPriceService(config.FUEL_PRICE_TTL_MS);

export class FuelPriceController {
        static async getPrices(_req: Request, res: Response) {
                const prices = await service.getPrices();
                res.json({ prices });
        }

        static async updatePrices(req: Request, res: Response) {
                try {
                        const { corriente, extra } = req.body;
                        const prices = await service.updatePrices({ corriente, extra });
                        res.json({ prices });
                } catch (err: any) {
                        res.status(400).json({ message: err.message });
                }
        }
}
