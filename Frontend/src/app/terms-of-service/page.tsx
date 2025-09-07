"use client";

import React from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";


export default function TermsOfService() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 font-[var(--font-geist-sans)] text-gray-700">
			{/* Contenido principal */}
			<main className="max-w-3xl mx-auto py-16 px-4">
				<h1 className="text-4xl font-bold text-indigo-600 mb-4">
					Condiciones de Servicio
				</h1>
				<p className="text-sm text-gray-500 mb-8">
					Última actualización: 19 de abril de 2025
				</p>

				{/* Sección 1 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						1. Aceptación de los Términos
					</h2>
					<p>
						Al utilizar la aplicación TripFuel, aceptas quedar sujeto a estas
						Condiciones de Servicio y a nuestra Política de Privacidad. Si no
						estás de acuerdo con alguno de los términos, por favor no uses la
						aplicación.
					</p>
				</section>

				{/* Sección 2 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						2. Descripción del Servicio
					</h2>
					<p>
						TripFuel permite registrar y gestionar viajes, calcular el consumo
						de gasolina, estimar costos y ofrecer estadísticas en tiempo real
						para ayudarte a optimizar tu autonomía.
					</p>
				</section>

				{/* Sección 3 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						3. Uso Permisible
					</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Sólo puedes usar TripFuel para fines lícitos y de acuerdo con
							estas Condiciones.
						</li>
						<li>
							No debes interferir con el funcionamiento de la aplicación ni
							acceder a áreas no autorizadas.
						</li>
					</ul>
				</section>

				{/* Sección 4 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						4. Registro y Cuentas
					</h2>
					<p className="mb-2">
						Para acceder a ciertas funciones debes registrarte y crear una
						cuenta:
					</p>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Eres responsable de mantener la confidencialidad de tu contraseña.
						</li>
						<li>
							Debes notificarnos de inmediato cualquier uso no autorizado de tu
							cuenta.
						</li>
					</ul>
				</section>

				{/* Sección 5 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						5. Prohibiciones
					</h2>
					<p>Queda prohibido:</p>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Publicar contenido ilegal, difamatorio o infractor de derechos de
							terceros.
						</li>
						<li>
							Utilizar robots, scrapers u otras herramientas automatizadas para
							acceder o extraer datos.
						</li>
						<li>Reversar ingeniería, descompilar o modificar la aplicación.</li>
					</ul>
				</section>

				{/* Sección 6 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						6. Propiedad Intelectual
					</h2>
					<p>
						Todos los derechos de propiedad intelectual de TripFuel y su
						contenido son propiedad de TripFuel o de sus licenciantes. No se
						concede ninguna licencia sobre dichos derechos salvo la expresamente
						indicada en estas Condiciones.
					</p>
				</section>

				{/* Sección 7 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						7. Limitación de Responsabilidad
					</h2>
					<p>
						TripFuel no será responsable por daños directos, indirectos,
						incidentales, especiales o consecuenciales derivados de tu uso o
						incapacidad de uso del servicio.
					</p>
				</section>

				{/* Sección 8 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						8. Modificaciones de los Términos
					</h2>
					<p>
						Podemos actualizar estas Condiciones en cualquier momento. Te
						notificaremos sobre cambios significativos a través de la aplicación
						o por correo.
					</p>
				</section>

				{/* Sección 9 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						9. Terminación
					</h2>
					<p>
						Podemos suspender o cancelar tu acceso al servicio si incumples
						estas Condiciones o por razones operativas sin previo aviso.
					</p>
				</section>

				{/* Sección 10 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						10. Ley Aplicable y Jurisdicción
					</h2>
					<p>
						Estas Condiciones se regirán por las leyes de Colombia y cualquier
						disputa se someterá a los tribunales competentes de Bogotá.
					</p>
				</section>

				{/* Sección 11 */}
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-indigo-600 mb-2">
						11. Contacto
					</h2>
					<p>
						Para consultas sobre estas Condiciones, escríbenos a{" "}
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
