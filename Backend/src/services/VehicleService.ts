import { VehicleRepository } from "../repositories/VehicleRepository";
import { IVehicle } from "../models/Vehicle";

export class VehicleService {
    private repo = new VehicleRepository();

    async ensureDefaultVehicle(userId: string): Promise<IVehicle> {
        let vehicle = await this.repo.findDefault(userId);
        if (!vehicle) {
            vehicle = await this.repo.createDefault(userId);
        }
        return vehicle;
    }

    async getDefaultVehicle(userId: string): Promise<IVehicle> {
        return this.ensureDefaultVehicle(userId);
    }

    async create(userId: string, name: string, licensePlate: string): Promise<IVehicle> {
        return this.repo.create({ userId, name, licensePlate });
    }

    async list(userId: string): Promise<IVehicle[]> {
        return this.repo.findByUser(userId);
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
