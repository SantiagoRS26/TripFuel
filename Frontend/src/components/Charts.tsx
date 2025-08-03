"use client";

import { Line, Scatter } from "react-chartjs-2";
import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend,
} from "chart.js";

ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend
);

export interface LineChartProps {
        labels: string[];
        data: number[];
        label: string;
}

export function LineChart({ labels, data, label }: LineChartProps) {
        const chartData = {
                labels,
                datasets: [
                        {
                                label,
                                data,
                                borderColor: "rgb(99, 102, 241)",
                                backgroundColor: "rgba(99, 102, 241, 0.3)",
                                tension: 0.1,
                        },
                ],
        };
        return <Line data={chartData} />;
}

interface Point {
        x: number;
        y: number;
}

export interface ScatterChartProps {
        points: Point[];
        regression?: { slope: number; intercept: number };
}

export function ScatterChart({ points, regression }: ScatterChartProps) {
        const datasets: any[] = [
                {
                        label: "Datos",
                        data: points,
                        backgroundColor: "rgb(99, 102, 241)",
                },
        ];

        if (regression && points.length > 1) {
                const xs = points.map((p) => p.x);
                const minX = Math.min(...xs);
                const maxX = Math.max(...xs);
                datasets.push({
                        label: "Tendencia",
                        type: "line",
                        data: [
                                { x: minX, y: regression.slope * minX + regression.intercept },
                                { x: maxX, y: regression.slope * maxX + regression.intercept },
                        ],
                        borderColor: "rgb(239, 68, 68)",
                        borderWidth: 2,
                        pointRadius: 0,
                });
        }

        return (
                <Scatter
                        data={{ datasets }}
                        options={{
                                scales: {
                                        x: { type: "linear", position: "bottom" },
                                },
                        }}
                />
        );
}
