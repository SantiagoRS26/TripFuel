import { TripRepository } from "../repositories/TripRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ITrip } from "../models/Trip";
import {
	average,
	gallonsToLiters,
	kmPerGallon,
	kmPerLiter,
} from "../utils/calculate";

export class TripService {
	private tripRepo = new TripRepository();
	private userRepo = new UserRepository();

	async create(userId: string, km: number, gal: number): Promise<ITrip> {
		return this.tripRepo.create({ userId, kilometers: km, gallons: gal });
	}

	async listWithSummary(userId: string) {
		const trips = await this.tripRepo.findByUser(userId);

		const kmsArr = trips.map((t) => t.kilometers);
		const galArr = trips.map((t) => t.gallons);

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
			},
		};
	}

	async calculate(userId: string, km: number) {
		const { summary } = await this.listWithSummary(userId);
		const user = await this.userRepo.findById(userId);
		if (!user) throw new Error("Usuario no encontrado");

		const galEstimated =
			summary.averageKilometers > 0
				? km * (summary.averageGallons / summary.averageKilometers)
				: 0;

		const lEstimated = gallonsToLiters(galEstimated);

		const costCorriente = galEstimated * user.fuelPrices.corriente;
		const costExtra = galEstimated * user.fuelPrices.extra;

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
