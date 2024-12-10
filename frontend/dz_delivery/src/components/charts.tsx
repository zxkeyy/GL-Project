import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Incoming",
        data: [1200, 1300, 1400, 1100, 1500, 900, 800],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Outgoing",
        data: [1000, 1100, 1200, 900, 1300, 800, 700],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        text: "Package Trends (Last 7 Days)",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export function LineChart() {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Forecasted Stock",
        data: [15000, 16500, 18000, 17500],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
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
        text: "Stock Forecast (Next 4 Weeks)",
      },
    },
  };

  return <Line data={data} options={options} />;
}
