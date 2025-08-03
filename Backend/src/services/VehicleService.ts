import { VehicleRepository } from "../repositories/VehicleRepository";
import { TripRepository } from "../repositories/TripRepository";
import { IVehicle } from "../models/Vehicle";

export class VehicleService {
    private repo = new VehicleRepository();
    private tripRepo = new TripRepository();

    async ensureDefaultVehicle(userId: string): Promise<IVehicle | null> {
        let vehicle = await this.repo.findDefault(userId);
        if (!vehicle) {
            const hasTrips = await this.tripRepo.userHasTrips(userId);
            if (!hasTrips) {
                return null;
            }
            vehicle = await this.repo.createDefault(userId);
            await this.tripRepo.assignVehicleToOldTrips(userId, vehicle.id);
        }
        return vehicle;
    }

    async getDefaultVehicle(userId: string): Promise<IVehicle | null> {
        return this.ensureDefaultVehicle(userId);
    }

    async create(userId: string, name: string, licensePlate: string): Promise<IVehicle> {
        return this.repo.create({ userId, name, licensePlate });
    }

    async list(userId: string): Promise<IVehicle[]> {
        return this.repo.findByUser(userId);
    }

    async findById(userId: string, id: string): Promise<IVehicle | null> {
        return this.repo.findById(userId, id);
    }

    async update(
        userId: string,
        id: string,
        data: { name?: string; licensePlate?: string }
    ): Promise<IVehicle | null> {
        return this.repo.updateById(userId, id, data);
    }

    async delete(userId: string, id: string): Promise<void> {
        await this.repo.deleteById(userId, id);
    }
}
