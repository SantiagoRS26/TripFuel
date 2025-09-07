import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Consulta cómo recopilamos y protegemos tus datos, nuestras políticas de cookies y los derechos que te asisten para usar la aplicación con plena confianza.",
  alternates: { canonical: "/privacity" },
};

export default function PrivacityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
