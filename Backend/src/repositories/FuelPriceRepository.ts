import { FuelPrice, IFuelPrice } from "../models/FuelPrice";

export class FuelPriceRepository {
        async get(): Promise<IFuelPrice> {
                let doc = await FuelPrice.findOne();
                if (!doc) {
                        doc = await FuelPrice.create({ corriente: 0, extra: 0 });
                }
                return doc;
        }

        async update(prices: { corriente?: number; extra?: number }): Promise<IFuelPrice> {
                const doc = await this.get();
                if (typeof prices.corriente === "number") doc.corriente = prices.corriente;
                if (typeof prices.extra === "number") doc.extra = prices.extra;
                await doc.save();
                return doc;
        }
}
