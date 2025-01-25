import type React from "react";
import {
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Box,
    Grid,
} from "@mui/material";
import { LocalShipping, CheckCircleOutline } from "@mui/icons-material";
import track from "/track.png";

const steps = [
    "Order Placed",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
];

const TrackDelivery: React.FC = () => {
    // This would typically come from your state management or API
    const currentStep = 2; // Example: delivery is "In Transit"

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                Track Your Delivery
            </Typography>
            <Paper elevation={0} sx={{ p: 4, bgcolor: "background.paper" }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1, fontWeight: 600 }}
                            >
                                Order #12345
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Estimated Delivery: June 15, 2023
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 500, color: "primary.main" }}
                            >
                                Current Status: {steps[currentStep]}
                            </Typography>
                        </Box>
                        <Stepper
                            activeStep={currentStep}
                            orientation="vertical"
                        >
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconComponent={
                                            index === currentStep
                                                ? LocalShipping
                                                : CheckCircleOutline
                                        }
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src={track}
                                alt="Delivery Map"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default TrackDelivery;
