import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de control",
  description: "Tablero interactivo que resume tus viajes y consumo, con promedios y datos clave para optimizar la eficiencia del combustible y tomar decisiones informadas.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
