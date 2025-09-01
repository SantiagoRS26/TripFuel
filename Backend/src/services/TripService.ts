import { TripRepository } from "../repositories/TripRepository";
import { VehicleService } from "./VehicleService";
import { FuelPriceService } from "./FuelPriceService";
import { ITrip } from "../models/Trip";
import {
	average,
	gallonsToLiters,
	kmPerGallon,
	kmPerLiter,
	slopeGalPerKm,
} from "../utils/calculate";

export class TripService {
        private tripRepo = new TripRepository();
        private vehicleSvc = new VehicleService();
        private fuelPriceSvc = new FuelPriceService();

        async create(userId: string, vehicleId: string, km: number, gal: number): Promise<ITrip> {
                await this.vehicleSvc.ensureDefaultVehicle(userId);
                const vehicle = await this.vehicleSvc.findById(userId, vehicleId);
                if (!vehicle) {
                        throw new Error("Debes crear un vehículo antes de registrar el consumo");
                }
                return this.tripRepo.create({ userId, vehicleId, kilometers: km, gallons: gal });
        }

        async listWithSummary(userId: string, vehicleId: string) {
                await this.vehicleSvc.ensureDefaultVehicle(userId);
                const [trips, prices] = await Promise.all([
                        this.tripRepo.findByVehicle(userId, vehicleId),
                        this.fuelPriceSvc.getPrices(),
                ]);

                const kmsArr = trips.map((t) => t.kilometers);
                const galArr = trips.map((t) => t.gallons);

                const slope = slopeGalPerKm(kmsArr, galArr);

                const avgKm = average(kmsArr);
                const avgGal = average(galArr);
                const avgKmPerGal = kmPerGallon(avgKm, avgGal);
                const avgKmPerL = kmPerLiter(avgKm, avgGal);

                return {
                        trips,
                        summary: {
                                averageKilometers: avgKm,
                                averageGallons: avgGal,
                                averageKmPerGallon: avgKmPerGal,
                                averageKmPerLiter: avgKmPerL,
                                slopeGalPerKm: slope,
                        },
                        prices,
                };
        }

        async calculate(userId: string, vehicleId: string, km: number) {
                const { summary, prices } = await this.listWithSummary(userId, vehicleId);

                const galEstimated = km * summary.slopeGalPerKm;

                const lEstimated = gallonsToLiters(galEstimated);
                const costCorriente = galEstimated * prices.corriente;
                const costExtra = galEstimated * prices.extra;

                return {
                        kilometers: km,
                        gallons: galEstimated,
                        liters: lEstimated,
                        cost: {
                                corriente: costCorriente,
                                extra: costExtra,
                        },
                };
        }

	async deleteTrip(userId: string, tripId: string): Promise<void> {
		await this.tripRepo.deleteById(userId, tripId);
	}
}
