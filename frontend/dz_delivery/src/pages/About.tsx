import type React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import logo from "/logo-black.svg";

const About: React.FC = () => {
    return (
        <>
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    About Blitz Delivery
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ mb: 4, color: "text.secondary" }}
                >
                    Revolutionizing the delivery industry
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 8 }}>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h4"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                        Our Story
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Blitz Delivery was founded with a simple yet powerful
                        vision: to make deliveries faster, more reliable, and
                        more accessible than ever before. Our journey began in a
                        small garage, with just a handful of dedicated
                        individuals and a fleet of three vehicles.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Today, we've grown into a nationwide network of
                        thousands of drivers and state-of-the-art logistics
                        centers. Despite our growth, we've never lost sight of
                        our core mission: to provide lightning-fast, secure, and
                        customer-centric delivery services.
                    </Typography>
                </Grid>
                <Grid item className="justify-center">
                    <Box
                        component="img"
                        src={logo}
                        alt="Blitz Delivery Team"
                        sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mb: 8 }}>
                <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    Meet Our Leadership
                </Typography>
                <Grid container spacing={4}>
                    {[
                        {
                            name: "Elaziz Dhia eddine",
                            role: "Team Leader",
                            image: "/placeholder.svg?height=200&width=200",
                        },
                        {
                            name: "Selmani Zakaria",
                            role: "Backend, Mobile Developer",
                            image: "/placeholder.svg?height=200&width=200",
                        },
                        {
                            name: "Bouchenafa Mouna",
                            role: "Backend Developer",
                            image: "/placeholder.svg?height=200&width=200",
                        },
                        {
                            name: "Zaoudi Hadil",
                            role: "UI/UX Designer",
                            image: "/placeholder.svg?height=200&width=200",
                        },
                        {
                            name: "Hamidi Amira",
                            role: "Frontend Developer",
                            image: "/placeholder.svg?height=200&width=200",
                        },
                    ].map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    p: 2,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {member.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default About;
