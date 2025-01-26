import React from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import { People, LocalShipping, Assessment } from "@mui/icons-material";
import { Link } from "react-router-dom";

const DashboardItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string;
    link: string;
}> = ({ icon, title, value, link }) => (
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
        <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}
        >
            {value}
        </Typography>
        <Typography
            variant="body2"
            component={Link}
            to={link}
            sx={{
                mt: "auto",
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
            }}
        >
            View Details
        </Typography>
    </Paper>
);

const AdminDashboard: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                Admin Dashboard
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <DashboardItem
                        icon={<People />}
                        title="Total Users"
                        value="1,234"
                        link="/admin/user-management"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <DashboardItem
                        icon={<LocalShipping />}
                        title="Active Deliveries"
                        value="56"
                        link="/admin/delivery-management"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <DashboardItem
                        icon={<Assessment />}
                        title="System Overview"
                        value="View Stats"
                        link="/admin/system-overview"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
