import type React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./NavBar";
import { Box, Container } from "@mui/material";
import Home from "@/pages/Home";
import Footer from "./Footer";

const Layout: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    const isDriverApplication = location.pathname === "/driver-application";

    const isOther =
        location.pathname === "/about" ||
        location.pathname === "/services" ||
        location.pathname === "/contact";
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
            {isDriverApplication ? (
                <Outlet />
            ) : (
                <>
                    <Navbar />
                    <Container
                        component="main"
                        sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 4 } }}
                    >
                        <Outlet />
                    </Container>
                </>
            )}
            {(isOther || isDriverApplication) && <Footer />}
        </Box>
    );
};

export default Layout;
