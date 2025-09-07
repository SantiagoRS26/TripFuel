import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticación social",
  description: "Inicia sesión con proveedores externos y completa la autenticación en segundos para acceder a tu cuenta sin contraseñas y vivir una experiencia rápida y fluida.",
  alternates: { canonical: "/auth/social" },
};

export default function SocialAuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
