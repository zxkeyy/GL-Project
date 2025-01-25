import type React from "react";
import { Typography, TextField, Button, Grid, Paper, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { LocalShipping } from "@mui/icons-material";

interface DeliveryFormData {
    pickupAddress: string;
    deliveryAddress: string;
    packageDescription: string;
    recipientName: string;
    recipientPhone: string;
}

const CreateDelivery: React.FC = () => {
    const { control, handleSubmit } = useForm<DeliveryFormData>();

    const onSubmit = (data: DeliveryFormData) => {
        console.log(data);
        // Here you would typically send this data to your backend
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
                                name="pickupAddress"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Pickup address is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Pickup Address"
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
                                name="deliveryAddress"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Delivery address is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Delivery Address"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="packageDescription"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Package description is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Package Description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="recipientName"
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
                                name="recipientPhone"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Recipient phone is required",
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
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<LocalShipping />}
                                sx={{ mt: 2 }}
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
