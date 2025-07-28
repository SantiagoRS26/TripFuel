"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function NavBar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { logout, user } = useAuth();

	// Ocultar NavBar en rutas públicas
	const hiddenPaths = ["/login", "/signup", "/unauthorized"];
	if (hiddenPaths.includes(pathname)) return null;

        const links = [
                { href: "/dashboard", label: "Dashboard" },
                { href: "/trips/new", label: "Nuevo Viaje" },
                { href: "/vehicles", label: "Vehículos" },
                { href: "/calculator", label: "Calculadora" },
                { href: "/settings", label: "Ajustes" },
        ];

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	return (
		<header className="sticky top-0 z-50 bg-gradient-to-b from-indigo-50 to-sky-50 backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}>
					<Link
						href="/"
						className="block w-[150px] sm:w-[180px]">
						<Image
							src="/TripFuel.png"
							alt="TripFuel Logo"
							width={180}
							height={40}
							priority
						/>
					</Link>
				</motion.div>

				{/* Desktop Nav */}
				<nav className="hidden md:flex space-x-8 items-center">
					{links.map((link) => (
						<motion.div
							key={link.href}
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300 }}>
							<Link
								href={link.href}
								className={`px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
									pathname === link.href
										? "bg-indigo-100 text-indigo-700"
										: "text-indigo-600 hover:bg-indigo-50"
								}`}>
								{link.label}
							</Link>
						</motion.div>
					))}

					{/* Mostrar botón solo si hay usuario logueado */}
					{user && (
						<motion.button
							whileHover={{ scale: 1.05 }}
							className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
							onClick={handleLogout}>
							Cerrar Sesión
						</motion.button>
					)}
				</nav>

				{/* Mobile Toggle */}
				<button
					className="md:hidden p-2 text-indigo-600 hover:bg-indigo-100 rounded-md transition"
					onClick={() => setMobileOpen(!mobileOpen)}>
					{mobileOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.nav
						key="mobile"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden bg-gradient-to-b from-indigo-50 to-sky-50 shadow-inner">
						<div className="px-4 pt-4 pb-6 space-y-2">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
										pathname === link.href
											? "bg-indigo-100 text-indigo-700"
											: "text-indigo-600 hover:bg-indigo-50"
									}`}>
									{link.label}
								</Link>
							))}
							{/* Mostrar botón de logout solo si hay usuario */}
							{user && (
								<button
									onClick={() => {
										setMobileOpen(false);
										handleLogout();
									}}
									className="w-full text-left px-4 py-2 mt-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
									Cerrar Sesión
								</button>
							)}
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
