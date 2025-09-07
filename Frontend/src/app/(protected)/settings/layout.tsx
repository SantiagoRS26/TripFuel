import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración de precios",
  description: "Define precios por galón para cálculos exactos y controla quién puede editarlos, manteniendo tu información de combustible actualizada según tus gastos.",
  alternates: { canonical: "/settings" },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
