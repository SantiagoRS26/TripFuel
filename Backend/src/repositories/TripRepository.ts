import { Trip, ITrip } from "../models/Trip";
import { Types } from "mongoose";

export class TripRepository {
        async create(data: {
                userId: string;
                vehicleId: string;
                kilometers: number;
                gallons: number;
        }): Promise<ITrip> {
                return Trip.create({
                        userId: new Types.ObjectId(data.userId),
                        vehicleId: new Types.ObjectId(data.vehicleId),
                        kilometers: data.kilometers,
                        gallons: data.gallons,
                });
        }

        async findByVehicle(userId: string, vehicleId: string): Promise<ITrip[]> {
                return Trip.find({
                        userId: new Types.ObjectId(userId),
                        vehicleId: new Types.ObjectId(vehicleId),
                }).sort({ createdAt: -1 });
        }

        async assignVehicleToOldTrips(userId: string, vehicleId: string): Promise<void> {
                await Trip.updateMany(
                        {
                                userId: new Types.ObjectId(userId),
                                $or: [{ vehicleId: { $exists: false } }, { vehicleId: null }],
                        },
                        { vehicleId: new Types.ObjectId(vehicleId) }
                );
        }

	

	async deleteById(userId: string, tripId: string): Promise<void> {
		await Trip.deleteOne({
			_id: new Types.ObjectId(tripId),
			userId: new Types.ObjectId(userId),
		});
	}
}
