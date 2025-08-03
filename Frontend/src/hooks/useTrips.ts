"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import { ITrip, TripSummaryResponse } from "@/types";

interface TripsData {
        trips: ITrip[];
        summary: TripSummaryResponse;
}

export function useTrips(vehicleId: string) {
        const [trips, setTrips] = useState<ITrip[]>([]);
        const [summary, setSummary] = useState<TripSummaryResponse | null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

        const fetchData = useCallback(() => {
                if (!vehicleId) {
                        setTrips([]);
                        setSummary(null);
                        setLoading(false);
                        return;
                }
                setLoading(true);
                api
                        .get<TripsData>(`/trips?vehicleId=${vehicleId}`)
                        .then((res) => {
                                setTrips(res.data.trips);
                                setSummary(res.data.summary);
                        })
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

        return { trips, summary, loading, error, deleteTrip };
}
