import type React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    ListItemButton,
    Avatar,
} from "@mui/material";
import { Dashboard, LocalShipping, History, Add } from "@mui/icons-material";

const ClientSidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/client" },
        {
            text: "Create Delivery",
            icon: <Add />,
            path: "/client/create-delivery",
        },
        {
            text: "Track Delivery",
            icon: <LocalShipping />,
            path: "/client/track-delivery",
        },
        {
            text: "Delivery History",
            icon: <History />,
            path: "/client/delivery-history",
        },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 260,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 260,
                    boxSizing: "border-box",
                    bgcolor: "linear-gradient(to bottom, #f5f5f5, #dcdcdc)",
                    borderRight: "1px solid",
                    borderColor: "divider",
                    boxShadow: 3,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                }}
            >
                <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>C</Avatar>
                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                >
                    John Doe
                </Typography>
            </Box>
            <List>
                {menuItems.map((item) => (
                    <ListItem disablePadding key={item.text}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                "&.Mui-selected": {
                                    bgcolor: "primary.light",
                                    color: "black",
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
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default ClientSidebar;
