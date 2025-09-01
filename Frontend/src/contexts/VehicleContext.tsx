"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Vehicle } from "@/types";
import { useVehicles } from "@/hooks/useVehicles";
import { useAuth } from "./AuthContext";

interface VehicleContextType {
        vehicles: Vehicle[];
        loading: boolean;
        error: string | null;
        selectedVehicleId: string;
        setSelectedVehicleId: (id: string) => void;
        createVehicle: (name: string, licensePlate: string) => Promise<void>;
        updateVehicle: (
                id: string,
                data: { name: string; licensePlate: string }
        ) => Promise<void>;
        deleteVehicle: (id: string) => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export function VehicleProvider({ children }: { children: ReactNode }) {
        const { user } = useAuth();
        const {
                vehicles,
                loading,
                error,
                createVehicle,
                updateVehicle,
                deleteVehicle,
        } = useVehicles(!!user);
        const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

        useEffect(() => {
                const stored = typeof window !== "undefined" ? localStorage.getItem("selectedVehicleId") : null;
                if (stored) {
                        setSelectedVehicleId(stored);
                }
        }, []);

        useEffect(() => {
                if (!selectedVehicleId && vehicles.length > 0) {
                        setSelectedVehicleId(vehicles[0]._id);
                }
        }, [vehicles, selectedVehicleId]);

        useEffect(() => {
                if (selectedVehicleId) {
                        localStorage.setItem("selectedVehicleId", selectedVehicleId);
                }
        }, [selectedVehicleId]);

        return (
                <VehicleContext.Provider
                        value={{
                                vehicles,
                                loading,
                                error,
                                selectedVehicleId,
                                setSelectedVehicleId,
                                createVehicle,
                                updateVehicle,
                                deleteVehicle,
                        }}>
                        {children}
                </VehicleContext.Provider>
        );
}

export function useVehicle() {
        const ctx = useContext(VehicleContext);
        if (!ctx) throw new Error("useVehicle must be inside VehicleProvider");
        return ctx;
}

