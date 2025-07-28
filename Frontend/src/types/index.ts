export interface User {
	id: string;
	email: string;
	fuelPrices: {
		corriente: number;
		extra: number;
	};
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface ITrip {
	_id: string;
	userId: string;
	kilometers: number;
	gallons: number;
	createdAt: string;
}

export interface TripSummary {
	averageKilometers: number;
	averageGallons: number;
	averageKmPerGallon: number;
	averageKmPerLiter: number;
}

export interface TripSummaryResponse {
        averageKilometers: number;
        averageGallons: number;
        averageKmPerGallon: number;
        averageKmPerLiter: number;
}

export interface Vehicle {
        _id: string;
        userId: string;
        name: string;
        licensePlate: string;
        createdAt: string;
        updatedAt: string;
}

export interface CalculateResponse {
	kilometers: number;
	gallons: number;
	liters: number;
	cost: {
		corriente: number;
		extra: number;
	};
}
