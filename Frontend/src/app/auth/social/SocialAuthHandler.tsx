"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SocialAuthHandler() {
	const params = useSearchParams();
	const router = useRouter();
	const { socialLogin } = useAuth();

	useEffect(() => {
		const token = params.get("token");
		if (!token) {
			router.replace("/login");
			return;
		}

		(async () => {
			try {
				await socialLogin(token);
				const next = params.get("next") ?? "/dashboard";
				router.replace(next);
			} catch {
				router.replace("/login");
			}
		})();
	}, [params, router, socialLogin]);

	return (
		<div className="flex items-center justify-center h-screen">
			<p className="text-gray-600 animate-pulse">Procesando autenticación…</p>
		</div>
	);
}
