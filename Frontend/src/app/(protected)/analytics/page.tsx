"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTrips } from "@/hooks/useTrips";
import { useVehicles } from "@/hooks/useVehicles";
import { LineChart, ScatterChart } from "@/components/Charts";

export default function AnalyticsPage() {
        const { vehicles, loading: vehLoading } = useVehicles();
        const [vehicleId, setVehicleId] = useState<string>("");
        const { trips, summary, loading } = useTrips(vehicleId);

        useEffect(() => {
                if (!vehicleId && vehicles.length > 0) {
                        setVehicleId(vehicles[0]._id);
                }
        }, [vehicles, vehicleId]);

        if (vehLoading || loading)
                return <p className="p-4 text-center text-gray-500">Cargando datos...</p>;
        if (!vehicleId && vehicles.length === 0)
                return (
                        <p className="p-4 text-center text-gray-500">
                                Debes crear un vehículo antes de continuar.
                        </p>
                );

        const slopeGalPerKm = useMemo(() => {
                if (trips.length === 0) return 0;
                const n = trips.length;
                const meanX = trips.reduce((acc, t) => acc + t.kilometers, 0) / n;
                const meanY = trips.reduce((acc, t) => acc + t.gallons, 0) / n;
                const num = trips.reduce(
                        (acc, t) => acc + (t.kilometers - meanX) * (t.gallons - meanY),
                        0
                );
                const den = trips.reduce(
                        (acc, t) => acc + Math.pow(t.kilometers - meanX, 2),
                        0
                );
                return den ? num / den : 0;
        }, [trips]);

        const intercept = useMemo(() => {
                if (trips.length === 0) return 0;
                const meanX =
                        trips.reduce((acc, t) => acc + t.kilometers, 0) / trips.length;
                const meanY = trips.reduce((acc, t) => acc + t.gallons, 0) / trips.length;
                return meanY - slopeGalPerKm * meanX;
        }, [trips, slopeGalPerKm]);

        const scatterPoints = trips.map((t) => ({ x: t.kilometers, y: t.gallons }));
        const kmPerGallon = trips.map((t) => t.kilometers / t.gallons);
        const labels = trips.map((t) => new Date(t.createdAt).toLocaleDateString());

        return (
                <div className="p-4 space-y-8">
                        <h1 className="text-2xl font-bold text-indigo-600">Estadísticas</h1>
                        <div>
                                <select
                                        value={vehicleId}
                                        onChange={(e) => setVehicleId(e.target.value)}
                                        className="border rounded p-2">
                                        {vehicles.map((v) => (
                                                <option key={v._id} value={v._id}>
                                                        {v.name}
                                                </option>
                                        ))}
                                </select>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2">
                                <div className="bg-white p-4 rounded-lg shadow">
                                        <h2 className="text-lg font-semibold mb-4">Km por Galón</h2>
                                        <LineChart labels={labels} data={kmPerGallon} label="Km/Gal" />
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow">
                                        <h2 className="text-lg font-semibold mb-4">Galones vs Km</h2>
                                        <ScatterChart
                                                points={scatterPoints}
                                                regression={{ slope: slopeGalPerKm, intercept }}
                                        />
                                </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow">
                                <p className="text-gray-700">
                                        Promedio Km/Gal: {summary?.averageKmPerGallon.toFixed(2)}
                                </p>
                                <p className="text-gray-700">
                                        Pendiente Gal/Km: {slopeGalPerKm.toFixed(4)}
                                </p>
                        </div>
                </div>
        );
}
