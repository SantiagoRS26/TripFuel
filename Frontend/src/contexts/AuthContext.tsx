"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { User, AuthResponse, FuelPrices, FuelPricesResponse } from "../types";

interface AuthContextType {
        user: User | null;
        fuelPrices: FuelPrices | null;
        loading: boolean;
        signup: (email: string, password: string) => Promise<void>;
        login: (email: string, password: string) => Promise<void>;
        logout: () => void;
        updateFuelPrices: (corriente: number, extra: number) => Promise<void>;
        socialLogin: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
        const [user, setUser] = useState<User | null>(null);
        const [fuelPrices, setFuelPrices] = useState<FuelPrices | null>(null);
        const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
                if (!token) {
                        setLoading(false);
                        return;
                }
                Promise.all([api.get<AuthResponse>("/auth/me"), api.get<FuelPricesResponse>("/fuel-prices")])
                        .then(([userRes, priceRes]) => {
                                setUser(userRes.data.user);
                                setFuelPrices(priceRes.data.prices);
                        })
                        .catch(() => localStorage.removeItem("token"))
                        .finally(() => setLoading(false));
        }, []);

        const fetchFuelPrices = async () => {
                const res = await api.get<FuelPricesResponse>("/fuel-prices");
                setFuelPrices(res.data.prices);
        };

        const updateFuelPrices = async (corriente: number, extra: number) => {
                const res = await api.put<FuelPricesResponse>("/fuel-prices", {
                        corriente,
                        extra,
                });
                setFuelPrices(res.data.prices);
        };

	const signup = async (email: string, password: string) => {
                const res = await api.post<AuthResponse>("/auth/signup", {
                        email,
                        password,
                });
                localStorage.setItem("token", res.data.token);
                setUser(res.data.user);
                await fetchFuelPrices();
                router.push("/dashboard");
        };

	const login = async (email: string, password: string) => {
                const res = await api.post<AuthResponse>("/auth/login", {
                        email,
                        password,
                });
                localStorage.setItem("token", res.data.token);
                setUser(res.data.user);
                await fetchFuelPrices();
                router.push("/dashboard");
        };

	const logout = () => {
                localStorage.removeItem("token");
                setUser(null);
                setFuelPrices(null);
                router.push("/login");
        };

	const socialLogin = async (token: string) => {
                localStorage.setItem("token", token);
                const [userRes, priceRes] = await Promise.all([
                        api.get<AuthResponse>("/auth/me"),
                        api.get<FuelPricesResponse>("/fuel-prices"),
                ]);
                setUser(userRes.data.user);
                setFuelPrices(priceRes.data.prices);
        };

	return (
		<AuthContext.Provider
			value={{
                                user,
                                fuelPrices,
                                loading,
                                signup,
                                login,
                                logout,
                                updateFuelPrices,
                                socialLogin,
                       }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be inside AuthProvider");
	return ctx;
}
