{/* http://localhost:8081/pages/recomendacion/page */}
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";


type Plato = {
    Nombre: string;
    Precio: number;
    Calorias: number;
};

const data: Plato[] = [
    { Nombre: "Margarita", Precio: 8, Calorias: 250 },
    { Nombre: "Napolitana", Precio: 10, Calorias: 280 },
    { Nombre: "Vegetariana", Precio: 12, Calorias: 240 },
    { Nombre: "Pepperoni", Precio: 9, Calorias: 300 },
    { Nombre: "Hawaiana", Precio: 11, Calorias: 320 },
    { Nombre: "Veggie Lovers", Precio: 12, Calorias: 260 },
    { Nombre: "Tradicional", Precio: 5, Calorias: 220 },
    { Nombre: "Carne mechada", Precio: 5, Calorias: 300 },
    { Nombre: "Nachos cheddar", Precio: 5, Calorias: 400 },
    { Nombre: "Limonada", Precio: 1.5, Calorias: 80 },
    { Nombre: "Cerveza artesanal", Precio: 3, Calorias: 150 }
];


export default function RecomendacionPage() {
    const [categoria, setCategoria] = useState<string[]>([]);
    const [presupuesto, setPresupuesto] = useState<number>(10);
    const [ingredientes, setIngredientes] = useState<string>("");
    const [recomendaciones, setRecomendaciones] = useState<Plato[]>([]);

    const handleCategoriaChange = (cat: string) => {
        setCategoria((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const obtenerRecomendaciones = () => {
        let filtrado = data.filter((item) => item.Precio <= presupuesto);
        setRecomendaciones(filtrado);
    };

    const limpiarFiltros = () => {
        setCategoria([]);
        setPresupuesto(10);
        setIngredientes("");
        setRecomendaciones([]);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto border border-gray-300">
            <h1 className="text-xl font-bold text-gray-800 mb-3">Recomendación de menú</h1>
            <p className="text-sm text-gray-600 mb-4">
                Selecciona categoría, presupuesto e ingredientes opcionales para recomendaciones.
            </p>

            {/* Categoría */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría:</label>
                <div className="flex flex-wrap gap-2">
                    {["Pizza", "Sánduche", "Picada", "Bebida", "Cualquiera"].map((cat) => (
                        <label key={cat} className="flex items-center gap-1 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={categoria.includes(cat)}
                                onChange={() => handleCategoriaChange(cat)}
                                className="accent-yellow-400"
                            />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>

            {/* Presupuesto */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Presupuesto ($)</label>
                <input
                    type="number"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                    className="w-full text-center border border-gray-300 rounded p-1 text-sm mt-1"
                />
                <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(Number(e.target.value))}
                    className="w-full mt-2 accent-yellow-400"
                />
                <span className="text-sm">{presupuesto}</span>
            </div>

            {/* Ingredientes */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Ingredientes preferidos</label>
                <input
                    type="text"
                    placeholder="Ej: Sin Carne"
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                    className="border border-gray-300 w-full p-2 rounded text-sm mt-1"
                />
            </div>

            
            {/* Botones */}
            <div className="flex justify-center gap-4 mt-4">
            <button
                onClick={limpiarFiltros}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm w-24"
            >
                Limpiar
            </button>
            <button
                onClick={obtenerRecomendaciones}
                className="px-4 py-2 bg-yellow-400 text-white rounded-md text-sm w-28"
            >
                Recomendar
            </button>
            </div>

            {/* Resultados */}
            {recomendaciones.length > 0 && (
                <div className="mt-6 border border-gray-300 p-4 rounded-lg shadow-md">
                    <h2 className="text-md font-bold text-gray-700 mb-2">Recomendaciones</h2>
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b text-gray-600">
                                <th className="py-2">Nombre</th>
                                <th className="py-2">Precio</th>
                                <th className="py-2">Calorías</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recomendaciones.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2">{item.Nombre}</td>
                                    <td className="py-2">${item.Precio.toFixed(1)}</td>
                                    <td className="py-2">{item.Calorias}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

