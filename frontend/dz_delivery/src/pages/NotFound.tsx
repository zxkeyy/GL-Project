import type React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

const NotFound: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 64px)",
                minWidth: "100vw",
            }}
        >
            <Paper elevation={0} sx={{ p: 6, textAlign: "center" }}>
                <Typography
                    variant="h1"
                    sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}
                >
                    404
                </Typography>
                <Typography
                    variant="h4"
                    sx={{ color: "text.primary", mb: 2, fontWeight: 600 }}
                >
                    Page Not Found
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 4 }}
                >
                    The page you're looking for doesn't exist or has been moved.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    startIcon={<Home />}
                    size="large"
                >
                    Go to Home
                </Button>
            </Paper>
        </Box>
    );
};

export default NotFound;
