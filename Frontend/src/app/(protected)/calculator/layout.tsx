import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de consumo",
  description: "Ingresa los kilómetros del viaje y recibe galones, litros y costos estimados al instante para planificar tu ruta con precisión y aprovechar mejor cada tanque.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
