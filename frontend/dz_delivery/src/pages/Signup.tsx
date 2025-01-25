import type React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    Link,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { LocalShipping } from "@mui/icons-material";
import toast from "react-hot-toast";

const Signup: React.FC = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const fullname = data.get("name") as string;
        try {
            const response = await signup(email, fullname, password);
            if (response.success) {
                toast.success("Account created successfully");
                toast("Please check your email to verify your account", {
                    icon: "📧",
                });
                navigate("/client");
            } else {
                toast.error(response.error.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <Grid container component="main">
            <Grid
                item
                xs={false}
                sm={3}
                md={6}
                sx={{
                    backgroundImage: "url(/box-illustration.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "fill",
                    backgroundPosition: "center",
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <LocalShipping
                        sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                    />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}
                    >
                        Join Blitz Delivery
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            textAlign: "center",
                            color: "text.secondary",
                        }}
                    >
                        Sign up now to experience lightning-fast deliveries and
                        seamless logistics management.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, width: "100%" }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            variant="outlined"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            variant="outlined"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem" }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Signup;
