import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupsIcon from "@mui/icons-material/Groups";
import PagesIcon from "@mui/icons-material/Pages";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(true); // Toggle between expanded and collapsed

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
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

        {/* User Section */}
        {drawerOpen && (
          <Box textAlign="center" my={2}>
            <img
            //   src="https://via.placeholder.com/80"
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

        {/* Menu List */}
        <List>

          {[
            { text: "Home", icon: <HomeIcon /> },
            { text: "Post", icon: <PostAddIcon /> },
            { text: "Messages", icon: <MailIcon /> },
            { text: "Friends", icon: <PeopleIcon /> },
            { text: "Notifications", icon: <NotificationsIcon /> },
            { text: "Group", icon: <GroupsIcon /> },
            { text: "Pages", icon: <PagesIcon /> },
            { text: "Games", icon: <SportsEsportsIcon /> },
            { text: "Setting", icon: <SettingsIcon /> },


          ].map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                display: "flex",
                justifyContent: drawerOpen ? "flex-start" : "center",
                px: 2,
              }}
            >
              <ListItemIcon
                sx={{ color: "#fff", justifyContent: "center", minWidth: 40 }}
              >
                {item.icon}
              </ListItemIcon>
              {drawerOpen && (
                <ListItemText primary={item.text} sx={{ color: "#fff" }} />
              )}
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Logout */}
        <Box mt="auto" p={2}>
          <ListItem
            button
            sx={{
              display: "flex",
              justifyContent: drawerOpen ? "flex-start" : "center",
              px: 2,
            }}
          >
            <ListItemIcon sx={{ color: "#fff", justifyContent: "center" }}>
              <LogoutIcon />
            </ListItemIcon>
            {drawerOpen && (
              <ListItemText primary="Log Out" sx={{ color: "#fff" }} />
            )}
          </ListItem>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
