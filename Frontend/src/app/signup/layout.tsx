import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de usuario",
  description: "Regístrate con correo y contraseña o usa Google para crear tu cuenta y comenzar a gestionar vehículos, viajes y cálculos de consumo adaptados a tus necesidades.",
  alternates: { canonical: "/signup" },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
