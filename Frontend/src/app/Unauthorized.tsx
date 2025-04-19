import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";

export default function Unauthorized() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex flex-col">
			<NavBar />
			<motion.div
				className="flex-grow flex flex-col items-center justify-center p-4"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6 }}>
				<h1 className="text-5xl font-extrabold text-indigo-600 mb-4">401</h1>
				<p className="text-xl text-gray-700 mb-6 text-center">
					No estás autorizado para ver este contenido.
				</p>
				<Link
					href="/login"
					className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition">
					Inicia Sesión
				</Link>
			</motion.div>
		</div>
	);
}
