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

interface Address {
    unit: string | null;
    building_type: string | null;
    street: string;
    city: string;
    state: string;
    country: string | null;
    postal_code: string | null;
}

interface Sender {
    id: number;
    email: string;
    phone_number: string | null;
    full_name: string;
    is_active: boolean;
}

interface Delivery {
    id: number;
    cost: string;
    created_at: string;
    current_address: Address;
    delivery_address: Address;
    delivery_progress: number;
    dimensions: number;
    insurance_amount: string;
    is_fragile: boolean;
    notes: string;
    pickup_address: Address;
    priority: "STANDARD" | "EXPRESS" | "URGENT"; // Enum for priority levels
    recipient_email: string;
    recipient_name: string;
    recipient_phone: string;
    requires_signature: boolean;
    sender: Sender;
    status: "IN_TRANSIT" | "PICKED_UP" | "REQUESTED" | string; // Enum for statuses
    tracking_number: string;
    verification_code: string;
    weight: number;
}

export const BarChart: React.FC<{ packages: Delivery[] }> = ({ packages }) => {
    // classify packages and their counts by day garding that package.created_at is of type Date
    const packageCounts = packages.reduce<Record<string, number>>(
        (acc, pkg) => {
            const date = new Date(pkg.created_at).toDateString();
            acc[date] = acc[date] ? acc[date] + 1 : 1;
            return acc;
        },
        {}
    );

    const data = {
        labels: Object.keys(packageCounts),
        datasets: [
            {
                label: "Packages",
                data: Object.values(packageCounts),
                backgroundColor: "rgb(75, 192, 192)",
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
};

export function LineChart() {
    // get stock prediction from a huggingface model
    // and display the forecasted stock for the next 4 weeks

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
