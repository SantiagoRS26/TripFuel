"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useVehicle } from "@/contexts/VehicleContext";
import LoadingState from "@/components/LoadingState";
import Spinner from "@/components/ui/spinner";

export default function NewTripPage() {
	const router = useRouter();

	/** ----------------------------------
	 *  Shared state & helpers
	 * ---------------------------------*/
        const {
                vehicles,
                loading: vehLoading,
                selectedVehicleId,
                setSelectedVehicleId,
        } = useVehicle();
        const [selectedTab, setSelectedTab] = useState<string>("direct");
	const [gallons, setGallons] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	/** Tab 1 – registrar kilómetros directamente */
	const [kilometers, setKilometers] = useState<string>("");

	/** Tab 2 – odómetro antes / después  */
	const [initialKm, setInitialKm] = useState<string>("");
        const [finalKm, setFinalKm] = useState<string>("");

        if (vehLoading) return <LoadingState message="Cargando tus vehículos…" />;
        if (!selectedVehicleId && vehicles.length === 0)
                return <p className="p-4 text-center text-gray-500">Debes crear un vehículo antes de continuar.</p>;

	const isValidNumber = (value: string) => /^[0-9]*[.,]?[0-9]*$/.test(value);
	const toNumber = (value: string) => parseFloat(value.replace(",", "."));

	/** -------------------------------
	 *  Handlers for controlled inputs
	 * ------------------------------*/
	const handleGallonsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (isValidNumber(value) || value === "") setGallons(value);
	};

	// Tab 1
	const handleKilometersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (isValidNumber(value) || value === "") setKilometers(value);
	};

	// Tab 2
	const handleInitialKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (isValidNumber(value) || value === "") setInitialKm(value);
	};

	const handleFinalKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (isValidNumber(value) || value === "") setFinalKm(value);
	};

	/** -------------------------------
	 *  Submit
	 * ------------------------------*/
        const handleSubmit = async (e: React.FormEvent) => {
                e.preventDefault();
                setError(null);

                if (!selectedVehicleId) {
                        setError("Debes crear un vehículo antes");
                        return;
                }

		let kmNumber: number | null = null;
		const galNumber = toNumber(gallons);

		if (selectedTab === "direct") {
			if (!kilometers) {
				setError("Por favor completa todos los campos");
				return;
			}
			kmNumber = toNumber(kilometers);
			if (isNaN(kmNumber)) {
				setError("Introduce valores numéricos válidos en kilómetros");
				return;
			}
		} else {
			// odómetro antes / después
			if (!initialKm || !finalKm) {
				setError("Completa los kilómetros iniciales y finales");
				return;
			}
			const init = toNumber(initialKm);
			const fin = toNumber(finalKm);
			if (isNaN(init) || isNaN(fin)) {
				setError("Introduce valores numéricos válidos en kilómetros");
				return;
			}
			kmNumber = fin - init;
			if (kmNumber <= 0) {
				setError("Los kilómetros finales deben ser mayores que los iniciales");
				return;
			}
		}

		if (isNaN(galNumber)) {
			setError("Introduce valores numéricos válidos en galones");
			return;
		}

                setLoading(true);
                try {
                        await api.post("/trips", { vehicleId: selectedVehicleId, kilometers: kmNumber, gallons: galNumber });
                        router.push("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.message || "Error al guardar el viaje");
		} finally {
			setLoading(false);
		}
	};

	/** ----------------------------------
	 *  Render
	 * ---------------------------------*/
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex flex-col">
			{/* Hero */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center pt-24 pb-8 px-4">
				<h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600">
					Registro de Nuevo Viaje
				</h1>
				<p className="mt-2 text-gray-700 max-w-xl mx-auto">
					Ingresa la información de tu recorrido para actualizar tu historial.
				</p>
			</motion.div>

			{/* Form Card */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="flex-grow flex items-center justify-center px-4">
				<Card className="w-full max-w-md rounded-2xl shadow-lg overflow-hidden">
					<CardHeader className="bg-white">
						<CardTitle className="text-2xl text-indigo-600 font-bold">
							Nuevo Viaje
						</CardTitle>
					</CardHeader>
                                        <CardContent className="bg-white p-6">
                                                <div className="mb-4">
                                                        <Label className="text-gray-600">Vehículo</Label>
                                                        <select
                                                                value={selectedVehicleId}
                                                                onChange={(e) => setSelectedVehicleId(e.target.value)}
                                                                className="mt-1 w-full border rounded p-2">
                                                                {vehicles.map((v) => (
                                                                        <option key={v._id} value={v._id}>
                                                                                {v.name}
                                                                        </option>
                                                                ))}
                                                        </select>
                                                </div>
                                                <Tabs
                                                        defaultValue="direct"
                                                        value={selectedTab}
                                                        onValueChange={setSelectedTab}>
							<TabsList className="grid grid-cols-2 mb-6 bg-indigo-50 p-1 rounded-full">
								<TabsTrigger
									value="direct"
									className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-indigo-600 rounded-full py-2 text-sm font-medium transition">
									Kilómetros Directos
								</TabsTrigger>
								<TabsTrigger
									value="odometer"
									className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-indigo-600 rounded-full py-2 text-sm font-medium transition">
									Odómetro Inicio/Fin
								</TabsTrigger>
							</TabsList>

							{/* ----------------- Tab 1 ----------------- */}
							<TabsContent value="direct">
								<form
									onSubmit={handleSubmit}
									className="space-y-4">
									<div>
										<Label
											htmlFor="kilometers"
											className="text-gray-600">
											Kilómetros
										</Label>
										<Input
											id="kilometers"
											type="text"
											value={kilometers}
											onChange={handleKilometersChange}
											placeholder="e.g. 495.6 or 495,6"
											required={selectedTab === "direct"}
											className="mt-1"
										/>
									</div>

									<div>
										<Label
											htmlFor="gallons"
											className="text-gray-600">
											Galones
										</Label>
										<Input
											id="gallons"
											type="text"
											value={gallons}
											onChange={handleGallonsChange}
											placeholder="e.g. 12.345 or 12,345"
											required
											className="mt-1"
										/>
									</div>

									{error && <p className="text-red-500">{error}</p>}

									<Button
										type="submit"
										disabled={loading}
										className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition">
                            {loading ? (
                              <>
                                <Spinner size={16} /> Guardando…
                              </>
                            ) : (
                              "Guardar"
                            )}
									</Button>
								</form>
							</TabsContent>

							{/* ----------------- Tab 2 ----------------- */}
							<TabsContent value="odometer">
								<form
									onSubmit={handleSubmit}
									className="space-y-4">
									<div>
										<Label
											htmlFor="initialKm"
											className="text-gray-600">
											Kilómetros Iniciales
										</Label>
										<Input
											id="initialKm"
											type="text"
											value={initialKm}
											onChange={handleInitialKmChange}
											placeholder="e.g. 10.000 or 10000"
											required={selectedTab === "odometer"}
											className="mt-1"
										/>
									</div>

									<div>
										<Label
											htmlFor="finalKm"
											className="text-gray-600">
											Kilómetros Finales
										</Label>
										<Input
											id="finalKm"
											type="text"
											value={finalKm}
											onChange={handleFinalKmChange}
											placeholder="e.g. 10.495 or 10495"
											required={selectedTab === "odometer"}
											className="mt-1"
										/>
									</div>

									<div>
										<Label
											htmlFor="gallons2"
											className="text-gray-600">
											Galones
										</Label>
										<Input
											id="gallons2"
											type="text"
											value={gallons}
											onChange={handleGallonsChange}
											placeholder="e.g. 12.345 or 12,345"
											required
											className="mt-1"
										/>
									</div>

									{error && <p className="text-red-500">{error}</p>}

									<Button
										type="submit"
										disabled={loading}
										className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition">
                            {loading ? (
                              <>
                                <Spinner size={16} /> Guardando…
                              </>
                            ) : (
                              "Guardar"
                            )}
									</Button>
								</form>
							</TabsContent>
						</Tabs>

						{/* Cancel & back links under tabs */}
						<div className="mt-6 space-y-2">
							<Button
								variant="secondary"
								type="button"
								onClick={() => router.push("/dashboard")}
								className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full py-3 font-medium transition">
								Cancelar
							</Button>
							<div className="text-center">
								<Link
									href="/dashboard"
									className="text-indigo-600 hover:underline">
									← Volver al Dashboard
								</Link>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Footer CTA */}
			<footer className="text-center py-6 bg-indigo-50">
				<Link
					href="/dashboard"
					className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition">
					Ver Historial de Viajes
				</Link>
			</footer>
		</div>
	);
}
