"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { ITrip, TripSummaryResponse } from "@/types";

interface TripsData {
	trips: ITrip[];
	summary: TripSummaryResponse;
}

export function useTrips(vehicleId: string) {
        const [data, setData] = useState<TripsData | null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

        const fetchData = useCallback(() => {
                if (!vehicleId) {
                        setData(null);
                        setLoading(false);
                        return;
                }
                setLoading(true);
                api
                        .get<TripsData>(`/trips?vehicleId=${vehicleId}`)
                        .then((res) => setData(res.data))
                        .catch((err) => setError(err.message || "Error al cargar viajes"))
                        .finally(() => setLoading(false));
        }, [vehicleId]);

	useEffect(() => {
		fetchData();
        }, [fetchData]);

	const deleteTrip = async (id: string) => {
                await api.delete(`/trips/${id}`);
                fetchData();
        };

	return { data, loading, error, deleteTrip };
}
