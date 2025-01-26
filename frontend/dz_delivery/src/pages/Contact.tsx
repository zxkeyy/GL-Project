import type React from "react";
import {
    Typography,
    Box,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

const Contact: React.FC = () => {
    return (
        <>
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                    Contact Us
                </Typography>
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ mb: 4, color: "text.secondary" }}
                >
                    We're here to help with all your delivery needs
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h3"
                                gutterBottom
                                sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",
                                }}
                            >
                                Send Us a Message
                            </Typography>
                            <form>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    margin="normal"
                                    required
                                    type="email"
                                />
                                <TextField
                                    fullWidth
                                    label="Subject"
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Message"
                                    margin="normal"
                                    required
                                    multiline
                                    rows={4}
                                />
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ mt: 2, borderRadius: 50 }}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h3"
                                gutterBottom
                                sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",
                                }}
                            >
                                Contact Information
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Phone
                                        sx={{ mr: 2, color: "primary.main" }}
                                    />
                                    <Typography variant="body1">
                                        +1 (555) 123-4567
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Email
                                        sx={{ mr: 2, color: "primary.main" }}
                                    />
                                    <Typography variant="body1">
                                        info@blitzdelivery.com
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <LocationOn
                                        sx={{ mr: 2, color: "primary.main" }}
                                    />
                                    <Typography variant="body1">
                                        123 Delivery St, Shipment City, ST 12345
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <Typography
                                variant="h5"
                                component="h3"
                                gutterBottom
                                sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",
                                }}
                            >
                                Business Hours
                            </Typography>
                            <Typography variant="body1">
                                Monday - Friday: 8:00 AM - 8:00 PM
                            </Typography>
                            <Typography variant="body1">
                                Saturday: 9:00 AM - 5:00 PM
                            </Typography>
                            <Typography variant="body1">
                                Sunday: Closed
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Contact;
