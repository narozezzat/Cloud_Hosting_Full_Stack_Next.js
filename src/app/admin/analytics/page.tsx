"use client"
import React from "react";
import { FaUsers } from "react-icons/fa";
import { Bar } from "react-chartjs-2"; // Import Bar chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
    // Example data for the chart
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "User Growth",
                data: [50, 100, 150, 200, 250, 300],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "User Growth Over Time",
            },
        },
    };

    return (
        <div className="p-3 mb-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
                <FaUsers className="me-2" />
                Analytics
            </h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-3xl font-bold">300</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">User Growth Chart</h2>
                <Bar data={data} options={options} /> {/* Use Bar chart */}
            </div>
        </div>
    );
};

export default AnalyticsPage;