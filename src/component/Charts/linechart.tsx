"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        data: [500, 1000, 750, 1250, 900, 1500],
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.3, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#fff", 
        },
      },
      title: {
        display: true,
        text: "Monthly Revenue",
        color: "#fff", 
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" }, 
        grid: { color: "#333" },   
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#333" },
      },
    },
  };

  return (
    <div style={{
      maxWidth: "700px",
      height: "350px",
      margin: "16px auto 0px auto",
      background: "#181818",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.2)"
    }}>
      <Line data={data} options={options} />
    </div>
  );
}
