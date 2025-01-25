import React from "react";
import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { LocalShipping, History, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { BarChart, LineChart } from "../../components/charts"; // Update import path

const DashboardItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}> = ({ icon, title, description, link }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
        }}
    >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {React.cloneElement(icon as React.ReactElement, {
                sx: { fontSize: 40, color: "primary.main", mr: 2 },
            })}
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
            {description}
        </Typography>
        <Button
            component={Link}
            to={link}
            variant="contained"
            color="primary"
            endIcon={<LocalShipping />}
        >
            Go to {title}
        </Button>
    </Paper>
);

const ClientDashboard: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                Welcome to Your Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <DashboardItem
                        icon={<Add />}
                        title="Create Delivery"
                        description="Start a new delivery request quickly and easily"
                        link="/client/create-delivery"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <DashboardItem
                        icon={<LocalShipping />}
                        title="Track Delivery"
                        description="Check the real-time status of your current deliveries"
                        link="/client/track-delivery"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <DashboardItem
                        icon={<History />}
                        title="Delivery History"
                        description="View and manage your past deliveries"
                        link="/client/delivery-history"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <BarChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <LineChart />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ClientDashboard;
