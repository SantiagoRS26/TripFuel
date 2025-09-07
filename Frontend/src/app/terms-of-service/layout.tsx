import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condiciones de servicio",
  description: "Revisa los términos de uso de TripFuel, tus obligaciones y los límites de responsabilidad para aprovechar el servicio respetando la propiedad intelectual.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
