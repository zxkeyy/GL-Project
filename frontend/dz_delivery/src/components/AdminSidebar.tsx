import type React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    ListItemButton,
} from "@mui/material";
import {
    Dashboard,
    People,
    LocalShipping,
    Assessment,
} from "@mui/icons-material";

const AdminSidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
        {
            text: "User Management",
            icon: <People />,
            path: "/admin/user-management",
        },
        {
            text: "Delivery Management",
            icon: <LocalShipping />,
            path: "/admin/delivery-management",
        },
        {
            text: "System Overview",
            icon: <Assessment />,
            path: "/admin/system-overview",
        },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    bgcolor: "background.paper",
                    borderRight: "1px solid",
                    borderColor: "divider",
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                >
                    Admin Portal
                </Typography>
            </Box>
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        sx={{
                            "&.Mui-selected": {
                                bgcolor: "primary.light",
                                color: "primary.main",
                                "&:hover": {
                                    bgcolor: "primary.light",
                                },
                            },
                            "&:hover": {
                                bgcolor: "action.hover",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "inherit" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default AdminSidebar;
