import { FuelPriceRepository } from "../repositories/FuelPriceRepository";
import { IFuelPrice } from "../models/FuelPrice";

export class FuelPriceService {
        private repo = new FuelPriceRepository();
        private cachedPrice: IFuelPrice | null = null;
        private cacheTime = 0;

        constructor(private ttl: number = 5 * 60 * 1000) {}

        async getPrices(): Promise<IFuelPrice> {
                const now = Date.now();
                if (this.cachedPrice && now - this.cacheTime < this.ttl) {
                        return this.cachedPrice;
                }
                const price = await this.repo.get();
                this.cachedPrice = price;
                this.cacheTime = now;
                return price;
        }

        async updatePrices(prices: { corriente?: number; extra?: number }): Promise<IFuelPrice> {
                const updated = await this.repo.update(prices);
                this.cachedPrice = null;
                this.cacheTime = 0;
                return updated;
        }
}
