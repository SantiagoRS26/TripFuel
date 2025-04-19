import { Trip, ITrip } from "../models/Trip";
import { Types } from "mongoose";

export class TripRepository {
	async create(data: {
		userId: string;
		kilometers: number;
		gallons: number;
	}): Promise<ITrip> {
		return Trip.create({
			userId: new Types.ObjectId(data.userId),
			kilometers: data.kilometers,
			gallons: data.gallons,
		});
	}

	async findByUser(userId: string): Promise<ITrip[]> {
		return Trip.find({ userId: new Types.ObjectId(userId) }).sort({
			createdAt: -1,
		});
	}

	async deleteById(userId: string, tripId: string): Promise<void> {
		await Trip.deleteOne({
			_id: new Types.ObjectId(tripId),
			userId: new Types.ObjectId(userId),
		});
	}
}
