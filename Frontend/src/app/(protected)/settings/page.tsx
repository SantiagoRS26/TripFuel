"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";


export default function SettingsPage() {
  const { user, fuelPrices, updateFuelPrices } = useAuth();
  const isAdmin = user?.role === "admin";
  // Estados de texto para mostrar con separadores de miles
  const [corrienteStr, setCorrienteStr] = useState<string>("");
  const [extraStr, setExtraStr] = useState<string>("");

  useEffect(() => {
    if (fuelPrices) {
      setCorrienteStr(
        fuelPrices.corriente
          ? fuelPrices.corriente.toLocaleString("es-CO")
          : ""
      );
      setExtraStr(
        fuelPrices.extra ? fuelPrices.extra.toLocaleString("es-CO") : ""
      );
    }
  }, [fuelPrices]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCorrienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Eliminar todo excepto dígitos
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setCorrienteStr("");
    } else {
      const num = parseInt(raw, 10);
      setCorrienteStr(num.toLocaleString("es-CO"));
    }
  };

  const handleExtraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setExtraStr("");
    } else {
      const num = parseInt(raw, 10);
      setExtraStr(num.toLocaleString("es-CO"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convertir texto a número
    const corrienteNum = corrienteStr
      ? parseInt(corrienteStr.replace(/\./g, ""), 10)
      : 0;
    const extraNum = extraStr ? parseInt(extraStr.replace(/\./g, ""), 10) : 0;

    setLoading(true);
    setMessage(null);
    try {
      await updateFuelPrices(corrienteNum, extraNum);
      setMessage("Precios actualizados correctamente");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 pt-24 pb-12 px-4">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600">
          Configuración de Precios
        </h1>
        <p className="mt-4 text-gray-700">
          Ajusta los precios de galón en COP para cálculos precisos.
        </p>
      </motion.div>

      {/* Settings Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <Card className="rounded-2xl shadow-lg overflow-hidden">
          <CardHeader className="bg-white">
            <CardTitle className="text-2xl text-indigo-600 font-bold">
              Precios de Combustible
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white space-y-6 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Precio Corriente */}
              <div>
                <Label htmlFor="corriente" className="text-gray-600">
                  Precio Galón Corriente
                </Label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <Input
                    id="corriente"
                    type="text"
                    value={corrienteStr}
                    onChange={handleCorrienteChange}
                    placeholder="0"
                    required
                    className="pl-7"
                    disabled={!isAdmin}
                  />
                </div>
              </div>

              {/* Precio Extra */}
              <div>
                <Label htmlFor="extra" className="text-gray-600">
                  Precio Galón Extra
                </Label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <Input
                    id="extra"
                    type="text"
                    value={extraStr}
                    onChange={handleExtraChange}
                    placeholder="0"
                    className="pl-7"
                    disabled={!isAdmin}
                  />
                </div>
              </div>

              {isAdmin && (
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition"
                >
                  {loading ? (
                    <>
                      <Spinner size={16} /> Guardando…
                    </>
                  ) : (
                    "Guardar"
                  )}
                </Button>
              )}

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-green-600 font-medium"
                >
                  {message}
                </motion.p>
              )}
            </form>

            <div className="text-center mt-4">
              <Link href="/dashboard" className="text-indigo-600 hover:underline">
                ← Volver al Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
