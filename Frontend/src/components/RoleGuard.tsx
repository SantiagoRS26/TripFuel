"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface RoleGuardProps {
    requiredRole: "admin" | "user";
    children: ReactNode;
    fallback?: ReactNode;
}

export default function RoleGuard({ requiredRole, children, fallback }: RoleGuardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user && user.role !== requiredRole) {
            router.replace("/unauthorized");
        }
    }, [loading, user, router, requiredRole]);

    if (loading) {
        return null;
    }

    if (!user || user.role !== requiredRole) {
        return <>{fallback ?? null}</>;
    }

    return <>{children}</>;
}
