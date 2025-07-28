"use client";

import React, { useState } from "react";
import { useTrips } from "@/hooks/useTrips";
import { useVehicles } from "@/hooks/useVehicles";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
        const { vehicles, loading: vehLoading } = useVehicles();
        const [vehicleId, setVehicleId] = useState<string>("");
        const { data, loading, error, deleteTrip } = useTrips(vehicleId);

        React.useEffect(() => {
                if (!vehicleId && vehicles.length > 0) {
                        setVehicleId(vehicles[0]._id);
                }
        }, [vehicles, vehicleId]);

        if (vehLoading || loading)
                return <p className="p-4 text-center text-gray-500">Cargando datos...</p>;
        if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
        if (!vehicleId && vehicles.length === 0)
                return (
                        <p className="p-4 text-center text-gray-500">
                                Debes crear un vehículo antes de continuar.
                        </p>
                );

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
			{/* Hero section */}
			<motion.section
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center py-20 px-4">
				<h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-4">
					Calcula la autonomía de tu vehículo con facilidad
				</h1>
				<p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
					Registra tus viajes, analiza tu consumo y optimiza tu rendimiento en
					carretera.
				</p>
                                <div className="flex flex-col items-center gap-4">
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

                                        <Link
                                                href="/trips/new"
                                                className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition">
                                                + Nuevo Viaje
                                        </Link>
                                </div>
                        </motion.section>

			{/* Stats */}
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-20">
				{[
					{
						label: "Km Promedio",
						value: data?.summary.averageKilometers.toFixed(2),
					},
					{
						label: "Galones Prom.",
						value: data?.summary.averageGallons.toFixed(2),
					},
					{
						label: "Km/Galón",
						value: data?.summary.averageKmPerGallon.toFixed(2),
					},
					{
						label: "Km/Litro",
						value: data?.summary.averageKmPerLiter.toFixed(2),
					},
				].map((stat, idx) => (
					<motion.div
						key={stat.label}
						className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition cursor-pointer"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3, delay: idx * 0.1 }}>
						<p className="text-gray-500">{stat.label}</p>
						<p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
					</motion.div>
				))}
			</motion.section>

			{/* Trips Table */}
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="container mx-auto px-4 pb-20">
				<div className="bg-white rounded-2xl shadow overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-indigo-100">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
									Fecha
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
									Km
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
									Gal.
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
									Km/Gal
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
									Km/Litro
								</th>
								<th className="px-6 py-3"></th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data?.trips.map((trip) => (
								<motion.tr
									key={trip._id}
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.2 }}>
									<td className="px-6 py-4 whitespace-nowrap">
										{new Date(trip.createdAt).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{trip.kilometers}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{trip.gallons}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{(trip.kilometers / trip.gallons).toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{(trip.kilometers / trip.gallons / 3.78541).toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right">
										<button
											onClick={() => deleteTrip(trip._id)}
											className="text-red-500 hover:text-red-700">
											<Trash2 size={20} />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.section>

			{/* Footer CTA */}
			<motion.footer
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="text-center py-12 bg-indigo-50">
				<p className="text-gray-700 mb-4">¿Listo para optimizar tu consumo?</p>
				<Link
					href="/calculator"
					className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition">
					Ir a Calculadora de Consumo
				</Link>
			</motion.footer>
		</div>
	);
}
