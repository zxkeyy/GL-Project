import type React from "react";
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

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

// This would typically come from your API or state management
// const deliveries = [
//     {
//         id: "12345",
//         date: "2023-06-01",
//         status: "Delivered",
//         recipient: "John Doe",
//     },
//     {
//         id: "12346",
//         date: "2023-06-05",
//         status: "In Transit",
//         recipient: "Jane Smith",
//     },
//     {
//         id: "12347",
//         date: "2023-06-10",
//         status: "Picked Up",
//         recipient: "Bob Johnson",
//     },
// ];

const DeliveryHistory: React.FC = () => {
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
                // get only packages that status is delivered
                const data = response.data.filter(
                    (delivery: Delivery) => delivery.status === "DELIVERED"
                );
                setPackages(data);
            } catch (error) {
                console.error(error);
            }
        };
        getPackages();
    }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                Delivery History
            </Typography>
            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Recipient</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packages.map((delivery) => (
                                <TableRow key={delivery.id} hover>
                                    <TableCell>{delivery.id}</TableCell>
                                    <TableCell>{delivery.created_at}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={delivery.status}
                                            color={
                                                delivery.status === "Delivered"
                                                    ? "success"
                                                    : "primary"
                                            }
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {delivery.recipient_name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default DeliveryHistory;
