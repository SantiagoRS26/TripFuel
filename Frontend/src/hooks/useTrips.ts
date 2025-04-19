"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { ITrip, TripSummaryResponse } from "@/types";

interface TripsData {
	trips: ITrip[];
	summary: TripSummaryResponse;
}

export function useTrips() {
	const [data, setData] = useState<TripsData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(() => {
		setLoading(true);
		api
			.get<TripsData>("/trips")
			.then((res) => setData(res.data))
			.catch((err) => setError(err.message || "Error al cargar viajes"))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const deleteTrip = async (id: string) => {
		await api.delete(`/trips/${id}`);
		fetchData();
	};

	return { data, loading, error, deleteTrip };
}
