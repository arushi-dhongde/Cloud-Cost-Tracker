"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export default function CostChart({ labels, ec2Data, s3Data, costData }) {
  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "EC2 Hours",
        data: ec2Data,
        yAxisID: "y",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        type: "bar",
        label: "S3 (GB)",
        data: s3Data,
        yAxisID: "y",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        type: "line",
        label: "Cost (USD)",
        data: costData,
        yAxisID: "y1",
        borderColor: "rgba(255, 99, 132, 0.9)",
        borderWidth: 2,
        tension: 0.2,
        fill: false,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: "Usage (Hours / GB)" },
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "Cost (USD)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return <Bar options={options} data={data} />;
}
