"use client";

import { useState } from "react";
import api from "@/lib/api";
import { CalculateResponse } from "@/types";

export function useCalculate(vehicleId: string) {
	const [data, setData] = useState<CalculateResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

        const calculate = async (km: number) => {
                setLoading(true);
                setError(null);
                try {
                        const res = await api.get<CalculateResponse>(`/trips/calculate?km=${km}&vehicleId=${vehicleId}`);
			setData(res.data);
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					err.message ||
					"Error al calcular consumo"
			);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, calculate };
}
