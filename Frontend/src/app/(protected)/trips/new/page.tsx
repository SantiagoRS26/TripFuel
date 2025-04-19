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

export default function NewTripPage() {
	const router = useRouter();
	const [kilometers, setKilometers] = useState<string>("");
	const [gallons, setGallons] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleKilometersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
			setKilometers(value);
		}
	};

	const handleGallonsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
			setGallons(value);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!kilometers || !gallons) {
			setError("Por favor completa todos los campos");
			return;
		}
		const kmNumber = parseFloat(kilometers.replace(",", "."));
		const galNumber = parseFloat(gallons.replace(",", "."));
		if (isNaN(kmNumber) || isNaN(galNumber)) {
			setError("Introduce valores numéricos válidos");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await api.post("/trips", { kilometers: kmNumber, gallons: galNumber });
			router.push("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.message || "Error al guardar el viaje");
		} finally {
			setLoading(false);
		}
	};

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
					Ingresa los kilómetros recorridos y los galones consumidos para
					actualizar tu historial.
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
					<CardContent className="bg-white space-y-6 p-6">
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
									required
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
								{loading ? "Guardando..." : "Guardar"}
							</Button>

							<Button
								variant="secondary"
								type="button"
								onClick={() => router.push("/dashboard")}
								className="w-full mt-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full py-3 font-medium transition">
								Cancelar
							</Button>
						</form>

						<div className="text-center mt-4">
							<Link
								href="/dashboard"
								className="text-indigo-600 hover:underline">
								← Volver al Dashboard
							</Link>
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
