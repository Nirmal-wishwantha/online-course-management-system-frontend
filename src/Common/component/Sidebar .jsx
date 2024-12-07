import React, { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import routes from "../Navigation/routes"; // Assumes routes are defined elsewhere

const Sidebar = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const logout = () => {
        localStorage.removeItem("education");
        window.location.reload();
    };

    const getRoutes = () =>
        routes.map((val, index) => (
            <Route key={index} path={val.path} element={val.element} />
        ));

    return (
        <Box display="flex">
            {/* Sidebar Drawer */}
            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: drawerOpen ? 240 : 60,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(10px)",
                        color: "#fff",
                        borderRight: "none",
                        transition: "width 0.3s",
                    },
                }}
            >
                {/* Header Section */}
                <Box
                    display="flex"
                    justifyContent={drawerOpen ? "space-between" : "center"}
                    alignItems="center"
                    p={2}
                >
                    {drawerOpen && (
                        <Typography variant="h6" noWrap>
                            Facenote
                        </Typography>
                    )}
                    <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* User Profile Section */}
                {drawerOpen && (
                    <Box textAlign="center" my={2}>
                        <img
                            src="https://via.placeholder.com/80"
                            alt="Profile"
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                marginBottom: 8,
                            }}
                        />
                        <Typography variant="body1">JeniKhant.design</Typography>
                        <Typography variant="body2" color="gray">
                            My Account
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

                {/* Navigation Menu */}
                <List>
                    {routes.map((val, index) => (
                        <Link
                            key={index}
                            to={val.path}
                            style={{ textDecoration: "none" }}
                        >
                            <ListItemButton
                                sx={{
                                    display: "flex",
                                    justifyContent: drawerOpen
                                        ? "flex-start"
                                        : "center",
                                    px: 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "#fff",
                                        justifyContent: "center",
                                        minWidth: 40,
                                    }}
                                >
                                    {val.icon}
                                </ListItemIcon>
                                {drawerOpen && (
                                    <ListItemText
                                        primary={val.text}
                                        sx={{ color: "#fff" }}
                                    />
                                )}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>

                <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

                {/* Logout Section */}
                <Box mt="auto" p={2}>
                    <ListItemButton
                        onClick={logout}
                        sx={{
                            display: "flex",
                            justifyContent: drawerOpen
                                ? "flex-start"
                                : "center",
                            px: 2,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "#fff",
                                justifyContent: "center",
                            }}
                        >
                            <LogoutIcon />
                        </ListItemIcon>
                        {drawerOpen && (
                            <ListItemText
                                primary="Log Out"
                                sx={{ color: "#fff" }}
                            />
                        )}
                    </ListItemButton>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box flexGrow={1} sx={{ padding: 3 }}>
                <Routes>
                    <Route path="*" element={<Navigate to={"/home"} />} />
                    {getRoutes()}
                </Routes>
            </Box>
        </Box>
    );
};

export default Sidebar;
