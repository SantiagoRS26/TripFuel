"use client";

import React from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";


export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 font-[var(--font-geist-sans)] text-gray-700">
			{/* Contenido principal */}
			<main className="max-w-3xl mx-auto py-16 px-4">
				<h1 className="text-4xl font-bold text-indigo-600 mb-4">
					Política de Privacidad
				</h1>
				<p className="text-sm text-gray-500 mb-8">
					Última actualización: 19 de abril de 2025
				</p>

				{/* Sección 1 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						1. Información que recopilamos
					</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>
							<strong>Datos de cuenta:</strong> Nombre, correo electrónico y
							contraseña.
						</li>
						<li>
							<strong>Datos de uso:</strong> Historial de viajes, consumo de
							gasolina, cálculos e interacciones dentro de la app.
						</li>
						<li>
							<strong>Datos técnicos:</strong> Dirección IP, tipo de
							dispositivo, sistema operativo y datos de diagnóstico.
						</li>
					</ul>
				</section>

				{/* Sección 2 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						2. Cómo usamos la información
					</h2>
					<p className="mb-2">Utilizamos tus datos para:</p>
					<ul className="list-disc list-inside space-y-2">
						<li>Proporcionar y mejorar nuestros servicios.</li>
						<li>
							Personalizar tu experiencia y mostrarte contenidos relevantes.
						</li>
						<li>Enviar notificaciones y comunicaciones necesarias.</li>
						<li>
							Detectar actividades sospechosas y garantizar la seguridad de la
							plataforma.
						</li>
					</ul>
				</section>

				{/* Sección 3 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						3. Cookies y tecnologías similares
					</h2>
					<p>
						Empleamos cookies y etiquetas web para recopilar información sobre
						tu navegación y preferencias. Puedes gestionarlas o desactivarlas
						desde la configuración de tu navegador, aunque esto podría afectar
						el funcionamiento óptimo de la app.
					</p>
				</section>

				{/* Sección 4 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						4. Compartir información con terceros
					</h2>
					<p className="mb-2">
						No vendemos tus datos personales. Compartimos información solo con:
					</p>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Proveedores y socios de confianza que ayudan a operar la
							aplicación.
						</li>
						<li>
							Autoridades cuando sea requerido por ley o para proteger derechos.
						</li>
					</ul>
				</section>

				{/* Sección 5 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						5. Seguridad de la información
					</h2>
					<p>
						Implementamos medidas técnicas y organizativas para proteger tus
						datos contra acceso no autorizado, alteración o eliminación. Sin
						embargo, ningún método de transmisión o almacenamiento es 100%
						seguro.
					</p>
				</section>

				{/* Sección 6 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						6. Tus derechos
					</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Derecho de acceso, rectificación, supresión y portabilidad de tus
							datos.
						</li>
						<li>Derecho a retirar tu consentimiento en cualquier momento.</li>
						<li>
							Derecho a presentar una reclamación ante la autoridad de
							protección de datos correspondiente.
						</li>
					</ul>
				</section>

				{/* Sección 7 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						7. Cambios en esta Política
					</h2>
					<p>
						Podemos actualizar esta Política de Privacidad periódicamente. Te
						notificaremos cualquier cambio significativo a través de la app o
						por correo.
					</p>
				</section>

				{/* Sección 8 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						8. Contacto
					</h2>
					<p>
						Si tienes preguntas o deseas ejercer tus derechos, contáctanos en{" "}
						<a
							href="mailto:santiagors2611@gmail.com"
							className="text-indigo-600 hover:underline">
							santiagors2611@gmail.com
						</a>
						.
					</p>
				</section>
			</main>

			{/* Footer */}
			<footer className="py-8 text-center text-gray-600 text-sm">
				<p>
					© {new Date().getFullYear()} TripFuel. Todos los derechos reservados.
				</p>
			</footer>
		</div>
	);
}
