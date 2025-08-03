import { FuelPriceRepository } from "../repositories/FuelPriceRepository";
import { IFuelPrice } from "../models/FuelPrice";

export class FuelPriceService {
        private repo = new FuelPriceRepository();

        getPrices(): Promise<IFuelPrice> {
                return this.repo.get();
        }

        updatePrices(prices: { corriente?: number; extra?: number }): Promise<IFuelPrice> {
                return this.repo.update(prices);
        }
}
