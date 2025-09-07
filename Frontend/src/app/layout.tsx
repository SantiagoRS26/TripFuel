import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import { VehicleProvider } from "../contexts/VehicleContext";
import "./globals.css";
import NavBar from "@/components/NavBar";
import OfflineTripSync from "@/components/OfflineTripSync";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const robotoMono = Roboto_Mono({
        subsets: ["latin"],
        variable: "--font-geist-mono",
});


export const metadata: Metadata = {
        title: "TripFuel",
        description: "Registra kms, galones y calcula consumos",
        manifest: "/manifest.json",
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="es" className={`${inter.variable} ${robotoMono.variable}`}>
                        <body>
                                <AuthProvider>
                                        <VehicleProvider>
                                                <NavBar />
                                                <OfflineTripSync />
                                                <main>{children}</main>
                                        </VehicleProvider>
                                </AuthProvider>
			</body>
		</html>
	);
}
