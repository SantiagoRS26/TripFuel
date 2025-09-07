import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestión de vehículos",
  description: "Gestiona tus vehículos agregando, editando o eliminando registros de nombre y placa mediante un listado interactivo que mantiene organizado tu garaje personal.",
  alternates: { canonical: "/vehicles" },
};

export default function VehiclesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
