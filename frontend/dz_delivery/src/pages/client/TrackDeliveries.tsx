import React, { useEffect, useState } from "react";
import {
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Grid,
    useTheme,
    useMediaQuery,
    Divider,
} from "@mui/material";
import {
    LocalShipping,
    AccessTime,
    Straighten,
    AttachMoney,
    PriorityHigh,
} from "@mui/icons-material";
import axios from "axios";
import { Scale } from "lucide-react";

// This would typically come from an API call
// const mockDeliveries = [
//     {
//         id: "1",
//         itemName: "Electronics Package",
//         status: "In Transit",
//         estimatedDelivery: "2023-06-15",
//         currentLocation: "Chicago, IL",
//     },
//     {
//         id: "2",
//         itemName: "Furniture Set",
//         status: "Out for Delivery",
//         estimatedDelivery: "2023-06-13",
//         currentLocation: "New York, NY",
//     },
//     {
//         id: "3",
//         itemName: "Book Collection",
//         status: "Processing",
//         estimatedDelivery: "2023-06-18",
//         currentLocation: "Los Angeles, CA",
//     },
//     {
//         id: "4",
//         itemName: "Gourmet Food Package",
//         status: "In Transit",
//         estimatedDelivery: "2023-06-16",
//         currentLocation: "Houston, TX",
//     },
// ];

interface Address {
    unit: string | null;
    building_type: string | null;
    street: string;
    city: string;
    state: string;
    country: string | null;
    postal_code: string | null;
}

interface Sender {
    id: number;
    email: string;
    phone_number: string | null;
    full_name: string;
    is_active: boolean;
}

interface Delivery {
    id: number;
    cost: string;
    created_at: string;
    current_address: Address;
    delivery_address: Address;
    delivery_progress: number;
    dimensions: number;
    insurance_amount: string;
    is_fragile: boolean;
    notes: string;
    pickup_address: Address;
    priority: "STANDARD" | "EXPRESS" | "URGENT"; // Enum for priority levels
    recipient_email: string;
    recipient_name: string;
    recipient_phone: string;
    requires_signature: boolean;
    sender: Sender;
    status: "IN_TRANSIT" | "PICKED_UP" | "REQUESTED" | string; // Enum for statuses
    tracking_number: string;
    verification_code: string;
    weight: number;
}

const TrackDeliveries: React.FC = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [packages, setPackages] = useState<Delivery[]>([]);

    useEffect(() => {
        const getPackages = async () => {
            try {
                axios.interceptors.request.use(
                    (config) => {
                        const storedState =
                            localStorage.getItem("auth-storage");
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
                const response = await axios.get(
                    `${backendUrl}/delivery/packages/my_packages`,
                    {
                        withCredentials: true,
                    }
                );
                // get only packages that status is not delivered
                const data = response.data.filter(
                    (delivery: Delivery) => delivery.status !== "DELIVERED"
                );
                setPackages(data);
            } catch (error) {
                console.error(error);
            }
        };
        getPackages();
    }, []);

    const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
        null
    );
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleOpenDetails = (delivery: Delivery) => {
        setSelectedDelivery(delivery);
    };

    const handleCloseDetails = () => {
        setSelectedDelivery(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "IN_TRANSIT":
                return "primary";
            case "PICKED_UP":
                return "secondary";
            case "REQUESTED":
                return "default";
            default:
                return "default";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "URGENT":
                return "error";
            case "EXPRESS":
                return "warning";
            case "STANDARD":
                return "success";
            default:
                return "default";
        }
    };

    const formatAddress = (address: Address) => {
        return `${address.street}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`;
    };

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
            <Typography
                variant="h4"
                sx={{ mb: 4, fontWeight: 700, color: "primary.main" }}
            >
                Track Your Deliveries
            </Typography>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <List>
                    {packages.map((delivery, index) => (
                        <React.Fragment key={delivery.id}>
                            {index > 0 && <Divider />}
                            <ListItem
                                alignItems="flex-start"
                                sx={{
                                    flexDirection: isMobile ? "column" : "row",
                                    py: 2,
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <ListItemText
                                            primary={`Tracking #: ${delivery.tracking_number}`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        To:{" "}
                                                        {
                                                            delivery.recipient_name
                                                        }
                                                    </Typography>
                                                    <br />
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {formatAddress(
                                                            delivery.delivery_address
                                                        )}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 1,
                                            }}
                                        >
                                            <Chip
                                                icon={<LocalShipping />}
                                                label={delivery.status}
                                                color={getStatusColor(
                                                    delivery.status
                                                )}
                                                size="small"
                                            />
                                            <Chip
                                                icon={<PriorityHigh />}
                                                label={delivery.priority}
                                                color={getPriorityColor(
                                                    delivery.priority
                                                )}
                                                size="small"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        container
                                        justifyContent={
                                            isMobile ? "flex-start" : "flex-end"
                                        }
                                    >
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() =>
                                                handleOpenDetails(delivery)
                                            }
                                            sx={{ mt: isMobile ? 1 : 0 }}
                                        >
                                            View Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <Dialog
                open={!!selectedDelivery}
                onClose={handleCloseDetails}
                maxWidth="md"
                fullWidth
            >
                {selectedDelivery && (
                    <>
                        <DialogTitle
                            sx={{
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                            }}
                        >
                            Delivery Details
                        </DialogTitle>
                        <DialogContent sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>
                                        Tracking #:{" "}
                                        {selectedDelivery.tracking_number}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 2,
                                        }}
                                    >
                                        <LocalShipping
                                            sx={{
                                                mr: 1,
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography variant="body1">
                                            Status: {selectedDelivery.status}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <PriorityHigh
                                            sx={{
                                                mr: 1,
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography variant="body1">
                                            Priority:{" "}
                                            {selectedDelivery.priority}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <AccessTime
                                            sx={{
                                                mr: 1,
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography variant="body1">
                                            Created:{" "}
                                            {new Date(
                                                selectedDelivery.created_at
                                            ).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <AttachMoney
                                            sx={{
                                                mr: 1,
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography variant="body1">
                                            Cost: ${selectedDelivery.cost}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                mr: 1,
                                                color: "primary.main",
                                            }}
                                        >
                                            <Scale />
                                        </Box>
                                        <Typography variant="body1">
                                            Weight: {selectedDelivery.weight} kg
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mt: 1,
                                        }}
                                    >
                                        <Straighten
                                            sx={{
                                                mr: 1,
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography variant="body1">
                                            Dimensions:{" "}
                                            {selectedDelivery.dimensions} cm³
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>
                                        Addresses
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Pickup:
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {formatAddress(
                                            selectedDelivery.pickup_address
                                        )}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Current Location:
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {formatAddress(
                                            selectedDelivery.current_address
                                        )}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Delivery:
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {formatAddress(
                                            selectedDelivery.delivery_address
                                        )}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Recipient
                                    </Typography>
                                    <Typography variant="body2">
                                        Name: {selectedDelivery.recipient_name}
                                    </Typography>
                                    <Typography variant="body2">
                                        Email:{" "}
                                        {selectedDelivery.recipient_email}
                                    </Typography>
                                    <Typography variant="body2">
                                        Phone:{" "}
                                        {selectedDelivery.recipient_phone}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Additional Information
                                    </Typography>
                                    <Typography variant="body2">
                                        Fragile:{" "}
                                        {selectedDelivery.is_fragile
                                            ? "Yes"
                                            : "No"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Requires Signature:{" "}
                                        {selectedDelivery.requires_signature
                                            ? "Yes"
                                            : "No"}
                                    </Typography>
                                    <Typography variant="body2">
                                        Insurance Amount: $
                                        {selectedDelivery.insurance_amount}
                                    </Typography>
                                    <Typography variant="body2">
                                        Notes: {selectedDelivery.notes}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleCloseDetails}
                                color="primary"
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default TrackDeliveries;
