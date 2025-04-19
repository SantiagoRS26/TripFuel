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
import { User, AuthResponse } from "../types";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	signup: (email: string, password: string) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	updatePrices: (corriente: number, extra: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setLoading(false);
			return;
		}
		api
			.get<AuthResponse>("/auth/me")
			.then((res) => setUser(res.data.user))
			.catch(() => localStorage.removeItem("token"))
			.finally(() => setLoading(false));
	}, []);

	const updatePrices = async (corriente: number, extra: number) => {
		const res = await api.put<{ user: User }>("/auth/fuel-prices", {
			corriente,
			extra,
		});
		localStorage.setItem("token", localStorage.getItem("token")!);
		setUser(res.data.user);
	};

	const signup = async (email: string, password: string) => {
		const res = await api.post<AuthResponse>("/auth/signup", {
			email,
			password,
		});
		localStorage.setItem("token", res.data.token);
		setUser(res.data.user);
		router.push("/dashboard");
	};

	const login = async (email: string, password: string) => {
		const res = await api.post<AuthResponse>("/auth/login", {
			email,
			password,
		});
		localStorage.setItem("token", res.data.token);
		setUser(res.data.user);
		router.push("/dashboard");
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		router.push("/login");
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, signup, login, logout, updatePrices }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be inside AuthProvider");
	return ctx;
}
