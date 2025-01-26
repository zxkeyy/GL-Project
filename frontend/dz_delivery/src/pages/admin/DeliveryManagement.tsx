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
    Button,
    Box,
    Chip,
} from "@mui/material";
import { Visibility, LocalShipping } from "@mui/icons-material";

// This would typically come from your API or state management
const deliveries = [
    {
        id: "12345",
        date: "2023-06-01",
        status: "In Transit",
        sender: "John Doe",
        recipient: "Jane Smith",
    },
    {
        id: "12346",
        date: "2023-06-05",
        status: "Picked Up",
        sender: "Alice Johnson",
        recipient: "Bob Williams",
    },
    {
        id: "12347",
        date: "2023-06-10",
        status: "Delivered",
        sender: "Charlie Brown",
        recipient: "David Miller",
    },
];

const DeliveryManagement: React.FC = () => {
    const handleUpdateStatus = (id: string) => {
        console.log(`Update status for delivery ${id}`);
        // Implement status update functionality
    };

    const handleViewDetails = (id: string) => {
        console.log(`View details for delivery ${id}`);
        // Implement view details functionality
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                Delivery Management
            </Typography>
            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Sender</TableCell>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deliveries.map((delivery) => (
                                <TableRow key={delivery.id} hover>
                                    <TableCell>{delivery.id}</TableCell>
                                    <TableCell>{delivery.date}</TableCell>
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
                                    <TableCell>{delivery.sender}</TableCell>
                                    <TableCell>{delivery.recipient}</TableCell>
                                    <TableCell>
                                        <Button
                                            startIcon={<LocalShipping />}
                                            onClick={() =>
                                                handleUpdateStatus(delivery.id)
                                            }
                                            sx={{ mr: 1 }}
                                        >
                                            Update Status
                                        </Button>
                                        <Button
                                            startIcon={<Visibility />}
                                            onClick={() =>
                                                handleViewDetails(delivery.id)
                                            }
                                            color="secondary"
                                        >
                                            View Details
                                        </Button>
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

export default DeliveryManagement;
