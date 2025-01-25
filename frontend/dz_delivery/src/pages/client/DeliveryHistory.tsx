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

// This would typically come from your API or state management
const deliveries = [
    {
        id: "12345",
        date: "2023-06-01",
        status: "Delivered",
        recipient: "John Doe",
    },
    {
        id: "12346",
        date: "2023-06-05",
        status: "In Transit",
        recipient: "Jane Smith",
    },
    {
        id: "12347",
        date: "2023-06-10",
        status: "Picked Up",
        recipient: "Bob Johnson",
    },
];

const DeliveryHistory: React.FC = () => {
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
                                    <TableCell>{delivery.recipient}</TableCell>
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
