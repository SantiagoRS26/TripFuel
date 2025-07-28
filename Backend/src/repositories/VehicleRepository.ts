import { Types } from "mongoose";
import { Vehicle, IVehicle } from "../models/Vehicle";

export class VehicleRepository {
    async create(data: { userId: string; name: string; licensePlate: string }): Promise<IVehicle> {
        return Vehicle.create({
            userId: new Types.ObjectId(data.userId),
            name: data.name,
            licensePlate: data.licensePlate,
        });
    }

    async findByUser(userId: string): Promise<IVehicle[]> {
        return Vehicle.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 });
    }

    async findById(userId: string, id: string): Promise<IVehicle | null> {
        return Vehicle.findOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) });
    }

    async updateById(
        userId: string,
        id: string,
        data: { name?: string; licensePlate?: string }
    ): Promise<IVehicle | null> {
        return Vehicle.findOneAndUpdate(
            { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) },
            data,
            { new: true }
        );
    }

    async deleteById(userId: string, id: string): Promise<void> {
        await Vehicle.deleteOne({ _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) });
    }
}
