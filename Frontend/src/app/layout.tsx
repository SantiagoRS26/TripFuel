import type { Metadata } from "next";
import { AuthProvider } from "../contexts/AuthContext";
import { VehicleProvider } from "../contexts/VehicleContext";
import "./globals.css";
import NavBar from "@/components/NavBar";


export const metadata: Metadata = {
	title: "TripFuel",
	description: "Registra kms, galones y calcula consumos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body>
                                <AuthProvider>
                                        <VehicleProvider>
                                                <NavBar />
                                                <main>{children}</main>
                                        </VehicleProvider>
                                </AuthProvider>
			</body>
		</html>
	);
}
