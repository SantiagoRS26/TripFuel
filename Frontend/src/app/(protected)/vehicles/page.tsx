"use client";

import React, { useState } from "react";
import { useVehicle } from "@/contexts/VehicleContext";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Spinner from "@/components/ui/spinner";
import LoadingState from "@/components/LoadingState";

export default function VehiclesPage() {
    const { vehicles, loading, error, createVehicle, updateVehicle, deleteVehicle } = useVehicle();
    const [name, setName] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                await updateVehicle(editId, { name, licensePlate });
                setEditId(null);
            } else {
                await createVehicle(name, licensePlate);
            }
            setName("");
            setLicensePlate("");
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (id: string, vName: string, vPlate: string) => {
        setEditId(id);
        setName(vName);
        setLicensePlate(vPlate);
    };

    if (loading) return <LoadingState message="Obteniendo tus vehículos…" />;
    if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50 pt-24 pb-12 px-4">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold text-indigo-600 text-center mb-8"
            >
                Mis Vehículos
            </motion.h1>

            <div className="max-w-md mx-auto mb-12">
                <Card className="rounded-2xl shadow-lg overflow-hidden">
                    <CardHeader className="bg-white">
                        <CardTitle className="text-2xl text-indigo-600 font-bold">
                            {editId ? "Editar Vehículo" : "Nuevo Vehículo"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="text-gray-600">
                                    Nombre
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="plate" className="text-gray-600">
                                    Placa
                                </Label>
                                <Input
                                    id="plate"
                                    type="text"
                                    value={licensePlate}
                                    onChange={(e) => setLicensePlate(e.target.value)}
                                    required
                                    className="mt-1"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-3 font-medium transition"
                            >
                                {saving ? (
                                  <>
                                    <Spinner size={16} /> Guardando…
                                  </>
                                ) : editId ? "Actualizar" : "Agregar"}
                            </Button>
                            {editId && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => {
                                        setEditId(null);
                                        setName("");
                                        setLicensePlate("");
                                    }}
                                    className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full py-3 font-medium transition"
                                >
                                    Cancelar
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="max-w-2xl mx-auto">
                <Card className="rounded-2xl shadow-lg overflow-hidden">
                    <CardHeader className="bg-white">
                        <CardTitle className="text-2xl text-indigo-600 font-bold">Listado</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-indigo-100">
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Placa</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vehicles.map((v) => (
                                    <TableRow key={v._id} className="hover:bg-indigo-50">
                                        <TableCell className="px-4 py-2">{v.name}</TableCell>
                                        <TableCell className="px-4 py-2">{v.licensePlate}</TableCell>
                                        <TableCell className="px-4 py-2 text-right space-x-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => startEdit(v._id, v.name, v.licensePlate)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteVehicle(v._id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="text-center mt-8">
                <Link href="/dashboard" className="text-indigo-600 hover:underline">
                    ← Volver al Dashboard
                </Link>
            </div>
        </div>
    );
}
