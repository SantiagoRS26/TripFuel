"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 font-[var(--font-geist-sans)]">
			{/* Hero Section */}
			<section className="text-center pt-32 pb-16 px-4">
				<motion.h1
					className="text-5xl sm:text-6xl font-extrabold text-indigo-600 mb-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					Controla tu consumo de gasolina con precisión
				</motion.h1>
				<motion.p
					className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}>
					Registra viajes, estima costos y optimiza tu autonomía de forma
					sencilla y elegante. ¡Empieza hoy!
				</motion.p>
				<motion.div
					className="flex justify-center gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}>
					<Link
						href="/signup"
						className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition">
						Regístrate
					</Link>
					<Link
						href="/login"
						className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition">
						Iniciar Sesión
					</Link>
				</motion.div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4">
				<h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-600 mb-12">
					Características Principales
				</h2>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
					{[
						{
							title: "Dashboard Interactivo",
							desc: "Visualiza tus estadísticas de consumo promedio en tiempo real.",
							link: "/dashboard",
						},
						{
							title: "Calculadora Inteligente",
							desc: "Estimaciones de galones, litros y costos al instante.",
							link: "/calculator",
						},
						{
							title: "Registro de Viajes",
							desc: "Añade nuevos viajes y lleva tu historial siempre actualizado.",
							link: "/trips/new",
						},
						{
							title: "Configuración de Precios",
							desc: "Define tus precios de gasolina para cálculos precisos.",
							link: "/settings",
						},
					].map((feature, idx) => (
						<motion.div
							key={feature.title}
							className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition cursor-pointer"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.2, duration: 0.5 }}>
							<h3 className="text-xl font-semibold text-indigo-600 mb-2">
								{feature.title}
							</h3>
							<p className="text-gray-700 mb-4">{feature.desc}</p>
							<Link
								href={feature.link}
								className="text-indigo-600 font-medium hover:underline">
								Ver más →
							</Link>
						</motion.div>
					))}
				</div>
			</section>

			{/* Call to Action */}
			<section className="bg-indigo-600 text-white py-20 px-4">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-4">
						¿Listo para optimizar tu consumo?
					</h2>
					<p className="mb-8">
						Únete a nuestra comunidad y empieza a ahorrar en cada kilómetro
						recorrido.
					</p>
					<Link
						href="/signup"
						className="bg-white text-indigo-600 px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
						Empieza Ahora
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 text-center text-gray-600 text-sm">
				<p>
					© {new Date().getFullYear()} MotoAutonomía. Todos los derechos
					reservados.
				</p>
			</footer>
		</div>
	);
}
