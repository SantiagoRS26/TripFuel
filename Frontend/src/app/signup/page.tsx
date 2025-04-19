"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
	const { signup } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await signup(email, password);
		} catch (err: any) {
			setError(err.message || "Error al registrarse");
		} finally {
			setLoading(false);
		}
	};

	const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-md">
				<Card className="rounded-2xl shadow-lg overflow-hidden">
					<CardHeader className="bg-white text-center py-6">
						<CardTitle className="text-3xl font-extrabold text-indigo-600">
							Crear Cuenta
						</CardTitle>
					</CardHeader>
					<CardContent className="bg-white p-6 space-y-4">
						<form
							onSubmit={handleSubmit}
							className="space-y-4">
							<div>
								<Label
									htmlFor="email"
									className="text-gray-600">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="mt-1"
								/>
							</div>
							<div>
								<Label
									htmlFor="password"
									className="text-gray-600">
									Contraseña
								</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="mt-1"
								/>
							</div>

							{error && <p className="text-red-500 text-center">{error}</p>}

							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition">
								{loading ? "Cargando..." : "Registrarse"}
							</Button>
						</form>

						{/* Separador */}
						<div className="flex items-center my-4">
							<span className="bg-gray-300 h-px flex-grow" />
							<span className="mx-2 text-gray-500">o</span>
							<span className="bg-gray-300 h-px flex-grow" />
						</div>

						{/* Botón de Google */}
						<a
							href={googleAuthUrl}
							className="block">
							<Button
								variant="outline"
								className="w-full cursor-pointer flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-100 rounded-full py-3 transition">
								<svg
									className="w-5 h-5"
									viewBox="0 0 533.5 544.3"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M533.5 278.4c0-18.4-1.6-36.4-4.7-53.8H272v101.9h146.9c-6.4 34.7-25.6 64.1-54.6 83.8l88.2 68c51.5-47.5 81-117.4 81-199.9z"
										fill="#4285F4"
									/>
									<path
										d="M272 544.3c73.7 0 135.6-24.4 180.8-66.2l-88.2-68c-24.5 16.4-55.8 26-92.6 26-71 0-131.2-47.9-152.7-112.2l-90.2 69.5c45.4 89.3 138.7 150.9 242.9 150.9z"
										fill="#34A853"
									/>
									<path
										d="M119.3 323.6c-11.8-35.2-11.8-73.4 0-108.6l-90.2-69.5c-39.4 78.5-39.4 169.5 0 248l90.2-69.5z"
										fill="#FBBC05"
									/>
									<path
										d="M272 107.7c39.7-.6 77.8 14.1 106.8 40.7l80-80C395.1 23.9 336.7 0 272 0 167.8 0 74.5 61.6 29.1 151l90.2 69.5C140.8 155.6 201 107.7 272 107.7z"
										fill="#EA4335"
									/>
								</svg>
								<span className="font-medium text-gray-700">
									Continuar con Google
								</span>
							</Button>
						</a>

						<p className="mt-4 text-center text-sm text-gray-700">
							¿Ya tienes cuenta?{" "}
							<Link
								href="/login"
								className="text-indigo-600 hover:underline">
								Inicia Sesión
							</Link>
						</p>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
