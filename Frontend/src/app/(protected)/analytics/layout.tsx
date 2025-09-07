import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analíticas de consumo",
  description: "Visualiza estadísticas de tus viajes para evaluar el consumo, comparar kilómetros con galones y mejorar la eficiencia en cada trayecto de tu vehículo.",
  alternates: { canonical: "/analytics" },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
