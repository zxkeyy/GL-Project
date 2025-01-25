import type React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Container } from "@mui/material";
import Home from "@/pages/Home";

const Layout: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    return isHome ? (
        <Home />
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Navbar />
            <Container
                component="main"
                sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 4 } }}
            >
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
