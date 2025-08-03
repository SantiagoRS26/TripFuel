"use client";

import React, { useState } from "react";
import { useCalculate } from "@/hooks/useCalculate";
import { useVehicles } from "@/hooks/useVehicles";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

// Helper para formatear a COP con separador de miles y sin decimales
const formatCOP = (value: number) => {
  const rounded = Math.round(value);
  return `$${rounded.toLocaleString("es-CO")}`;
};

export default function CalculatorPage() {
  const { vehicles, loading: vehLoading } = useVehicles();
  const [vehicleId, setVehicleId] = useState<string>("");
  const [km, setKm] = useState<string>("");
  const { data, loading, error, calculate } = useCalculate(vehicleId);
  const { fuelPrices } = useAuth();

  const corrientePrice = fuelPrices?.corriente ?? 0;
  const extraPrice = fuelPrices?.extra ?? 0;
  const noPrices = corrientePrice <= 0 && extraPrice <= 0;

  React.useEffect(() => {
    if (!vehicleId && vehicles.length > 0) {
      setVehicleId(vehicles[0]._id);
    }
  }, [vehicles, vehicleId]);

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
      setKm(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!km) return;
    const kmNumber = parseFloat(km.replace(",", "."));
    if (isNaN(kmNumber) || kmNumber <= 0) return;
    calculate(kmNumber);
  };

  if (noPrices) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center"
        >
          <p className="text-red-500 font-medium mb-4">
            Debes configurar al menos un precio de gasolina en Ajustes antes de usar la calculadora.
          </p>
          <Link
            href="/settings"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Ir a Ajustes
          </Link>
        </motion.div>
      </div>
    );
  }

  if (vehLoading)
    return <p className="p-4 text-center text-gray-500">Cargando datos...</p>;
  if (!vehicleId && vehicles.length === 0)
    return (
      <p className="p-4 text-center text-gray-500">Debes crear un vehículo antes de continuar.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 pt-24 pb-12 px-4">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 max-w-2xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600">
          Calculadora de Consumo
        </h1>
        <p className="mt-4 text-gray-700">
          Ingresa los kilómetros y obtén estimaciones de galones, litros y precios en COP.
        </p>
      </motion.section>

      {/* Calculator Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        <Card className="rounded-2xl shadow-lg overflow-hidden">
          <CardHeader className="bg-white">
            <CardTitle className="text-2xl text-indigo-600 font-bold">
              ¡Comencemos!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 bg-white p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-600">Vehículo</Label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="mt-1 w-full border rounded p-2"
                >
                  {vehicles.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="km" className="text-gray-600">
                  Kilómetros
                </Label>
                <Input
                  id="km"
                  type="text"
                  value={km}
                  onChange={handleKmChange}
                  placeholder="e.g. 120.5 or 120,5"
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition"
              >
                {loading ? "Calculando..." : "Calcular"}
              </Button>
            </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            {data && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Kilómetros */}
                <div className="bg-indigo-50 rounded-xl shadow p-4 text-center">
                  <p className="text-gray-500">Kilómetros</p>
                  <p className="text-2xl font-bold text-indigo-600">{data.kilometers.toFixed(2)}</p>
                </div>
                {/* Galones */}
                <div className="bg-indigo-50 rounded-xl shadow p-4 text-center">
                  <p className="text-gray-500">Galones</p>
                  <p className="text-2xl font-bold text-indigo-600">{data.gallons.toFixed(3)}</p>
                </div>
                {/* Litros */}
                <div className="bg-indigo-50 rounded-xl shadow p-4 text-center">
                  <p className="text-gray-500">Litros</p>
                  <p className="text-2xl font-bold text-indigo-600">{data.liters.toFixed(2)}</p>
                </div>
                {/* Precio Corriente */}
                <div className="bg-indigo-50 rounded-xl shadow p-4 text-center">
                  <p className="text-gray-500">Precio Corriente</p>
                  <p className="text-2xl font-bold text-green-600">{formatCOP(data.cost.corriente)}</p>
                </div>
                {/* Precio Extra */}
                <div className="bg-indigo-50 rounded-xl shadow p-4 text-center">
                  <p className="text-gray-500">Precio Extra</p>
                  <p className="text-2xl font-bold text-green-600">{formatCOP(data.cost.extra)}</p>
                </div>
              </motion.div>
            )}

            <div className="text-center mt-8">
              <Link
                href="/dashboard"
                className="inline-block text-indigo-600 hover:underline"
              >
                ← Volver al Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
