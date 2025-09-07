import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar viaje",
  description: "Registra un viaje con kilómetros y galones directos u odómetro. Los datos se guardan sin conexión para mantener actualizado tu historial de consumo.",
  alternates: { canonical: "/trips/new" },
};

export default function NewTripLayout({ children }: { children: React.ReactNode }) {
  return children;
}
