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

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;

        // Implement login logic here
        try {
            const response = await login(email, password);
            if (response.success) {
                toast.success("Login successful");
                navigate("/client");
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <Grid container component="main" sx={{ maxHeight: "100vh" }}>
            <Grid
                item
                xs={false}
                sm={3}
                md={6}
                sx={{
                    backgroundImage: "url(/welcome2.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
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
                        Welcome Back
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            textAlign: "center",
                            color: "text.secondary",
                        }}
                    >
                        Log in to access your Blitz Delivery account and manage
                        your deliveries with ease.
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                            autoComplete="current-password"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem" }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/forgot-password"
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/signup"
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
