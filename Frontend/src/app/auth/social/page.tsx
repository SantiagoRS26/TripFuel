"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function SocialAuthPage() {
	const search = useSearchParams();
	const router = useRouter();
	const { socialLogin } = useAuth();

	useEffect(() => {
		const token = search.get("token");
		if (!token) {
			router.replace("/login");
			return;
		}
		(async () => {
			try {
				await socialLogin(token);
				const next = search.get("next") ?? "/dashboard";
				router.replace(next);
			} catch {
				router.replace("/login");
			}
		})();
	}, [search, socialLogin, router]);

	return (
		<div className="flex items-center justify-center h-screen">
			<p className="text-gray-600 animate-pulse">Procesando autenticación…</p>
		</div>
	);
}
