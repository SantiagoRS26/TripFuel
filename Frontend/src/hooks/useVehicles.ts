"use client";

import useSWR from "swr";
import api from "@/lib/api";
import { Vehicle } from "@/types";

export function useVehicles(enabled = true) {
    const { data, error, isLoading, mutate } = useSWR<{ vehicles: Vehicle[] }>(
        enabled ? "/vehicles" : null,
        (url: string) => api.get<{ vehicles: Vehicle[] }>(url).then((res) => res.data)
    );

    const createVehicle = async (name: string, licensePlate: string) => {
        await api.post("/vehicles", { name, licensePlate });
        mutate();
    };

    const updateVehicle = async (
        id: string,
        data: { name: string; licensePlate: string }
    ) => {
        await api.put(`/vehicles/${id}`, data);
        mutate();
    };

    const deleteVehicle = async (id: string) => {
        await api.delete(`/vehicles/${id}`);
        mutate();
    };

    return {
        vehicles: data?.vehicles ?? [],
        loading: isLoading,
        error: error instanceof Error ? error.message : null,
        createVehicle,
        updateVehicle,
        deleteVehicle,
    };
}
