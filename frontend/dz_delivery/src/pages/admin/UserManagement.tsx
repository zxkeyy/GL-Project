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
import { Edit, Delete } from "@mui/icons-material";

// This would typically come from your API or state management
const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Client" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Client" },
    { id: "3", name: "Admin User", email: "admin@example.com", role: "Admin" },
];

const UserManagement: React.FC = () => {
    const handleEdit = (id: string) => {
        console.log(`Edit user ${id}`);
        // Implement edit functionality
    };

    const handleDelete = (id: string) => {
        console.log(`Delete user ${id}`);
        // Implement delete functionality
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
                User Management
            </Typography>
            <Paper elevation={0} sx={{ bgcolor: "background.paper" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.role}
                                            color={
                                                user.role === "Admin"
                                                    ? "secondary"
                                                    : "primary"
                                            }
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            startIcon={<Edit />}
                                            onClick={() => handleEdit(user.id)}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            startIcon={<Delete />}
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            color="error"
                                        >
                                            Delete
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

export default UserManagement;
