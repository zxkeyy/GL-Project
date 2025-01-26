import type React from "react";
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";
import {
    LocalShipping,
    FlightTakeoff,
    DirectionsBike,
    Inventory,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Services: React.FC = () => {
    const services = [
        {
            icon: <LocalShipping fontSize="large" />,
            title: "Standard Delivery",
            description:
                "Reliable and cost-effective delivery for non-urgent packages.",
            price: "$9.99",
        },
        {
            icon: <FlightTakeoff fontSize="large" />,
            title: "Express Delivery",
            description:
                "Same-day delivery for urgent packages within the city.",
            price: "$19.99",
        },
        {
            icon: <DirectionsBike fontSize="large" />,
            title: "Eco-Friendly Delivery",
            description:
                "Green delivery option using bicycles for short distances.",
            price: "$14.99",
        },
        {
            icon: <Inventory fontSize="large" />,
            title: "Bulk Shipping",
            description: "Efficient solutions for large volume shipments.",
            price: "Custom pricing",
        },
    ];

    return (
        <>
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    Our Services
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ mb: 4, color: "text.secondary" }}
                >
                    Tailored solutions for all your delivery needs
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={{ color: "primary.main", mb: 2 }}>
                                    {service.icon}
                                </Box>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    color="black"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {service.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    {service.description}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    fontWeight={800}
                                    color="red"
                                    sx={{ mt: "auto" }}
                                >
                                    {service.price}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{ justifyContent: "center", pb: 2 }}
                            >
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{ borderRadius: 50 }}
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    Need a Custom Solution?
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    We offer tailored delivery solutions for businesses with
                    unique requirements.
                </Typography>
                <Link to="/contact">
                    <Button variant="contained" color="primary" size="large">
                        Contact Us
                    </Button>
                </Link>
            </Box>
        </>
    );
};

export default Services;
