"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex flex-col">
			<motion.div
				className="flex-grow flex flex-col items-center justify-center p-4"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6 }}>
				<h1 className="text-5xl font-extrabold text-indigo-600 mb-4">404</h1>
				<p className="text-xl text-gray-700 mb-6 text-center">
					Página no encontrada.
				</p>
				<Link
					href="/"
					className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition">
					Volver al Inicio
				</Link>
			</motion.div>
		</div>
	);
}
