"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Plus, BarChart3, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function NavBar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [moreMenuOpen, setMoreMenuOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { logout, user } = useAuth();
	const moreMenuRef = useRef<HTMLDivElement>(null);

	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				moreMenuRef.current &&
				!moreMenuRef.current.contains(event.target as Node)
			) {
				setMoreMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Ocultar NavBar en rutas públicas
	const hiddenPaths = ["/login", "/signup", "/unauthorized"];
	if (hiddenPaths.includes(pathname)) return null;

	// Enlaces principales - solo los más importantes
	const primaryLinks = [
		{ href: "/dashboard", label: "Dashboard" },
		{ href: "/vehicles", label: "Vehículos" },
		{ href: "/calculator", label: "Calculadora" },
	];

	// Enlaces secundarios - agrupados en "Más"
	const secondaryLinks = [
		{ href: "/analytics", label: "Estadísticas", icon: BarChart3 },
		{ href: "/settings", label: "Ajustes", icon: Settings },
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
				<nav className="hidden md:flex items-center space-x-6">
					{/* Enlaces principales */}
					{primaryLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
								pathname === link.href
									? "bg-indigo-100 text-indigo-700"
									: "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
							}`}>
							{link.label}
						</Link>
					))}

					{/* Menú "Más" para enlaces secundarios */}
					<div
						className="relative"
						ref={moreMenuRef}>
						<button
							onClick={() => setMoreMenuOpen(!moreMenuOpen)}
							className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
								secondaryLinks.some((link) => pathname === link.href)
									? "bg-indigo-100 text-indigo-700"
									: "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
							}`}>
							<span>Más</span>
							<ChevronDown
								size={16}
								className={`transition-transform duration-200 ${
									moreMenuOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						{/* Dropdown del menú "Más" */}
						<AnimatePresence>
							{moreMenuOpen && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
									className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
									{secondaryLinks.map((link) => {
										const IconComponent = link.icon;
										return (
											<Link
												key={link.href}
												href={link.href}
												onClick={() => setMoreMenuOpen(false)}
												className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
													pathname === link.href
														? "bg-indigo-50 text-indigo-700"
														: "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
												}`}>
												<IconComponent size={16} />
												<span>{link.label}</span>
											</Link>
										);
									})}
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Botón CTA "Nuevo Viaje" */}
					<Link
						href="/trips/new"
						className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-sm hover:bg-indigo-700 transition-colors duration-200">
						<Plus size={16} />
						<span>Nuevo Viaje</span>
					</Link>

					{/* Botón de logout */}
					{user && (
						<button
							className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
							onClick={handleLogout}>
							Salir
						</button>
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
						className="md:hidden bg-white border-t border-gray-200 shadow-lg">
						<div className="px-4 pt-4 pb-6 space-y-3">
							{/* Botón destacado "Nuevo Viaje" */}
							<Link
								href="/trips/new"
								onClick={() => setMobileOpen(false)}
								className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-sm">
								<Plus size={18} />
								<span>Nuevo Viaje</span>
							</Link>

							{/* Enlaces principales */}
							{primaryLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`block px-4 py-3 rounded-md font-medium transition-colors duration-200 ${
										pathname === link.href
											? "bg-indigo-50 text-indigo-700"
											: "text-gray-600 hover:bg-gray-50"
									}`}>
									{link.label}
								</Link>
							))}

							{/* Enlaces secundarios */}
							<div className="border-t border-gray-100 pt-3">
								<p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
									Más opciones
								</p>
								{secondaryLinks.map((link) => {
									const IconComponent = link.icon;
									return (
										<Link
											key={link.href}
											href={link.href}
											onClick={() => setMobileOpen(false)}
											className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors duration-200 ${
												pathname === link.href
													? "bg-indigo-50 text-indigo-700"
													: "text-gray-600 hover:bg-gray-50"
											}`}>
											<IconComponent size={18} />
											<span className="font-medium">{link.label}</span>
										</Link>
									);
								})}
							</div>

							{/* Botón de logout */}
							{user && (
								<div className="border-t border-gray-100 pt-3">
									<button
										onClick={() => {
											setMobileOpen(false);
											handleLogout();
										}}
										className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-md transition-colors duration-200">
										Cerrar Sesión
									</button>
								</div>
							)}
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
