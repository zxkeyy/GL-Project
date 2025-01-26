import React from "react";
import {
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Box,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { LocalShipping } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

interface DeliveryFormData {
    recipient_name: string;
    recipient_phone: string;
    recipient_email: string;
    pickup_address: {
        street: string;
        city: string;
        state: string;
        postal_code: string;
    };
    delivery_address: {
        street: string;
        city: string;
        state: string;
        postal_code: string;
    };
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
    is_fragile: boolean;
    requires_signature: boolean;
    notes: string;
}

const CreateDelivery: React.FC = () => {
    const { control, handleSubmit, reset } = useForm<DeliveryFormData>({
        defaultValues: {
            recipient_name: "",
            recipient_phone: "",
            recipient_email: "",
            pickup_address: {
                street: "",
                city: "",
                state: "",
                postal_code: "",
            },
            delivery_address: {
                street: "",
                city: "",
                state: "",
                postal_code: "",
            },
            weight: "",
            dimensions: {
                length: "",
                width: "",
                height: "",
            },
            is_fragile: false,
            requires_signature: false,
            notes: "",
        },
    });

    const onSubmit = async (data: DeliveryFormData) => {
        try {
            axios.interceptors.request.use(
                (config) => {
                    const storedState = localStorage.getItem("auth-storage");
                    const accessToken = storedState
                        ? JSON.parse(storedState).state.accessToken
                        : null;
                    if (accessToken) {
                        config.headers.Authorization = `JWT ${accessToken}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/delivery/packages/`,
                data,
                { withCredentials: true }
            );
            if (response.data.id) {
                toast.success("Delivery created successfully");
                // clear form
                reset();
            } else {
                toast.error("Failed to create delivery");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validatePhoneNumber = (value: string) => {
        // 10 digits, no special characters
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value) || "Invalid phone number";
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || "Invalid email address";
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                Create a New Delivery
            </Typography>
            <Paper elevation={0} sx={{ p: 4, bgcolor: "background.paper" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="recipient_name"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Recipient name is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Recipient Name"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="recipient_phone"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Recipient phone is required",
                                    validate: validatePhoneNumber,
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Recipient Phone"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="recipient_email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Recipient email is required",
                                    validate: validateEmail,
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Recipient Email"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Pickup Address</Typography>
                        </Grid>
                        {["street", "city", "state", "postal_code"].map(
                            (field) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    key={`pickup_${field}`}
                                >
                                    <Controller
                                        name={
                                            `pickup_address.${field}` as
                                                | "delivery_address.street"
                                                | "delivery_address.city"
                                                | "delivery_address.state"
                                                | "delivery_address.postal_code"
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: `${field} is required`,
                                        }}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                {...field}
                                                label={`Pickup ${field.name.split(".").pop()?.replace("_", " ").toUpperCase()}`}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                            )
                        )}
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Delivery Address
                            </Typography>
                        </Grid>
                        {["street", "city", "state", "postal_code"].map(
                            (field) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    key={`delivery_${field}`}
                                >
                                    <Controller
                                        name={
                                            `delivery_address.${field}` as
                                                | "delivery_address.street"
                                                | "delivery_address.city"
                                                | "delivery_address.state"
                                                | "delivery_address.postal_code"
                                        }
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: `${field} is required`,
                                        }}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                {...field}
                                                label={`Delivery ${field.name.split(".").pop()?.replace("_", " ").toUpperCase()}`}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                            )
                        )}
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="weight"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Weight is required" }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Weight (kg)"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controller
                                        name="dimensions.length"
                                        control={control}
                                        rules={{
                                            required: "Length is required",
                                        }}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                {...field}
                                                value={field.value || ""}
                                                label="Length"
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="dimensions.width"
                                        control={control}
                                        rules={{
                                            required: "Width is required",
                                        }}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                {...field}
                                                value={field.value || ""}
                                                label="Width"
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="dimensions.height"
                                        control={control}
                                        rules={{
                                            required: "Height is required",
                                        }}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <TextField
                                                {...field}
                                                value={field.value || ""}
                                                label="Height"
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="is_fragile"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                            />
                                        }
                                        label="Is Fragile"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="requires_signature"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                checked={field.value}
                                            />
                                        }
                                        label="Requires Signature"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="notes"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Additional Notes"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<LocalShipping />}
                            >
                                Create Delivery
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateDelivery;
