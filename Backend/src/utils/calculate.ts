export const gallonsToLiters = (gallons: number): number => gallons * 3.78541;

export const average = (values: number[]): number =>
	values.reduce((a, b) => a + b, 0) / (values.length || 1);

export const kmPerGallon = (km: number, gal: number): number =>
	gal > 0 ? km / gal : 0;

export const kmPerLiter = (km: number, gal: number): number =>
	kmPerGallon(km, gal) / 3.78541;
