export const gallonsToLiters = (gallons: number): number => gallons * 3.78541;

export const average = (values: number[]): number =>
	values.reduce((a, b) => a + b, 0) / (values.length || 1);

export const kmPerGallon = (km: number, gal: number): number =>
	gal > 0 ? km / gal : 0;

export const kmPerLiter = (km: number, gal: number): number =>
	kmPerGallon(km, gal) / 3.78541;

export function slopeGalPerKm(kms: number[], gals: number[]): number {
	if (kms.length === 0) return 0;
	let num = 0;
	let den = 0;
	for (let i = 0; i < kms.length; i++) {
		num += kms[i] * gals[i];
		den += kms[i] * kms[i];
	}
	return den === 0 ? 0 : num / den;
}
