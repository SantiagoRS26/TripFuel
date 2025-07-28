"use client";

import { useState, useCallback, useEffect } from "react";
import api from "@/lib/api";
import { Vehicle } from "@/types";

export function useVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVehicles = useCallback(() => {
        setLoading(true);
        api
            .get<{ vehicles: Vehicle[] }>("/vehicles")
            .then((res) => setVehicles(res.data.vehicles))
            .catch((err) => setError(err.message || "Error al cargar vehículos"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    const createVehicle = async (name: string, licensePlate: string) => {
        await api.post("/vehicles", { name, licensePlate });
        fetchVehicles();
    };

    const updateVehicle = async (
        id: string,
        data: { name: string; licensePlate: string }
    ) => {
        await api.put(`/vehicles/${id}`, data);
        fetchVehicles();
    };

    const deleteVehicle = async (id: string) => {
        await api.delete(`/vehicles/${id}`);
        fetchVehicles();
    };

    return { vehicles, loading, error, createVehicle, updateVehicle, deleteVehicle };
}
