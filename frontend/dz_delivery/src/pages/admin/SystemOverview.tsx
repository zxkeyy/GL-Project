import type React from "react";
import { Typography, Paper, Grid } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const SystemOverview: React.FC = () => {
    const deliveryData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Deliveries",
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: "#72BF78",
            },
        ],
    };

    const userTypeData = {
        labels: ["Clients", "Admins"],
        datasets: [
            {
                data: [300, 50],
                backgroundColor: ["#A0D683", "#72BF78"],
            },
        ],
    };

    return (
        <Paper className="p-6" sx={{ backgroundColor: "#FEFF9F" }}>
            <Typography variant="h4" className="mb-4" sx={{ color: "#72BF78" }}>
                System Overview
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className="mb-2">
                        Monthly Deliveries
                    </Typography>
                    <Bar data={deliveryData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className="mb-2">
                        User Types
                    </Typography>
                    <Doughnut data={userTypeData} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SystemOverview;
