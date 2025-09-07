import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Inicia sesión con correo y contraseña o con Google para acceder a tu cuenta, gestionar tus datos de forma segura y continuar tu experiencia personalizada.",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
