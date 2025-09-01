"use client";

import useSWR from "swr";
import api from "@/lib/api";
import { ITrip, TripSummaryResponse, FuelPrices } from "@/types";

interface TripsData {
        trips: ITrip[];
        summary: TripSummaryResponse;
        prices: FuelPrices;
}

export function useTrips(vehicleId: string) {
        const { data, error, isLoading, mutate } = useSWR<TripsData>(
                vehicleId ? `/trips?vehicleId=${vehicleId}` : null,
                (url: string) => api.get<TripsData>(url).then((res) => res.data)
        );

        const deleteTrip = async (id: string) => {
                await api.delete(`/trips/${id}`);
                mutate();
        };

        return {
                trips: data?.trips ?? [],
                summary: data?.summary ?? null,
                prices: data?.prices ?? null,
                loading: isLoading,
                error: error instanceof Error ? error.message : null,
                deleteTrip,
        };
}
