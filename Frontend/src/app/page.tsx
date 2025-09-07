import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Registra viajes, calcula costos y analiza estadísticas de consumo en un entorno amigable que te ayuda a optimizar la eficiencia de tus vehículos.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
