import {
    Container,
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
    Code,
    DesignServices,
    Build,
    Download,
    CheckCircle,
} from "@mui/icons-material";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";

const items = [
    "Super Fast Delivery",
    "Real-Time Tracking",
    "Safe & Secure Handling",
    "Flexible Freelance Opportunities",
];

const services = [
    {
        icon: <Code />,
        title: "Code Integration",
        description:
            "Seamlessly integrate our delivery system into your existing platform.",
    },
    {
        icon: <DesignServices />,
        title: "Design Customization",
        description:
            "Tailor the look and feel of our app to match your brand identity.",
    },
    {
        icon: <Build />,
        title: "Development Support",
        description:
            "Get expert assistance with any technical challenges you encounter.",
    },
];

const HomePage = () => {
    return (
        <>
            <CssBaseline />
            <div className="min-h-screen bg-gray-50">
                <NavBar />

                {/* Hero Section */}
                <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                color="#000000"
                                fontSize={48}
                                sx={{ fontWeight: "bold" }}
                            >
                                With Blitz Everything is{" "}
                                <span style={{ color: "#A0D683" }}>
                                    Super Fast
                                </span>
                            </Typography>
                            <Typography
                                variant="h5"
                                color="#000000"
                                sx={{ mb: 4 }}
                            >
                                Your key to the fastest, most comfortable
                                delivery
                            </Typography>
                            <Link
                                to="/Package"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        backgroundColor: "#A0D683",
                                        color: "white",
                                        borderRadius: "20px",
                                        "&:hover": {
                                            backgroundColor: "#8BC34A",
                                        },
                                    }}
                                >
                                    Track Your Package
                                </Button>
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                src="/fast-delivery.svg"
                                alt="Fast Delivery"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "20px",
                                }}
                            />
                        </Box>
                    </Box>
                </Container>

                {/* Freelance Driver Section */}
                <Box sx={{ backgroundColor: "#FEFF9F", py: 8, my: 8 }}>
                    <Container maxWidth="xl">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    src="/freelancer.png"
                                    alt="Freelance Driver"
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto",
                                        borderRadius: "20px",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{ flex: 1 }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Typography
                                    variant="h3"
                                    gutterBottom
                                    color="#333333"
                                    fontSize={42}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Interested In Being A{" "}
                                    <span style={{ color: "#A0D683" }}>
                                        Freelance Driver
                                    </span>
                                    ? Get Our App!
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<Download />}
                                    sx={{
                                        mt: 2,
                                        backgroundColor: "#191A10",
                                        color: "white",
                                        borderRadius: "10px",
                                        "&:hover": {
                                            backgroundColor: "#2C2D1A",
                                        },
                                    }}
                                >
                                    Download
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Why Choose Us Section */}
                <Container maxWidth="xl" sx={{ my: 8 }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
                    >
                        Why Choose <span style={{ color: "#A0D683" }}>Us</span>
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4,
                            justifyContent: "center",
                        }}
                    >
                        {items.map((item, index) => (
                            <Card
                                key={index}
                                sx={{ maxWidth: 300, flex: "1 1 300px" }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <CheckCircle
                                            sx={{ color: "#A0D683", mr: 1 }}
                                        />
                                        <Typography variant="h6">
                                            {item}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1">
                                        {index === 0 &&
                                            "Experience lightning-fast deliveries with our optimized routes."}
                                        {index === 1 &&
                                            "Stay informed with our advanced real-time tracking system."}
                                        {index === 2 &&
                                            "Rest easy knowing your packages are handled with utmost care."}
                                        {index === 3 &&
                                            "Join our network of professional drivers and earn flexibly."}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>

                {/* Our Services Section */}
                <Box sx={{ backgroundColor: "#f9f9f9", py: 8 }}>
                    <Container maxWidth="xl">
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                mb: 4,
                            }}
                        >
                            Our Services
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 4,
                                justifyContent: "center",
                            }}
                        >
                            {services.map((service, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        maxWidth: 300,
                                        flex: "1 1 300px",
                                        textAlign: "center",
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            sx={{
                                                fontSize: 64,
                                                color: "#A0D683",
                                                mb: 2,
                                            }}
                                        >
                                            {service.icon}
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            {service.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {service.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Container>
                </Box>

                <Footer />
            </div>
        </>
    );
};

export default HomePage;
