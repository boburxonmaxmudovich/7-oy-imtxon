import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "../../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function Navbar() {
  const { mode, toggleTheme } = useThemeMode();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("userProfile") || "{}");

  const pageTitle = useMemo(() => {
    const map: Record<string, string> = {
      "/": "Asosiy",
      "/managers": "Managers",
      "/admins": "Admins",
      "/teachers": "Teachers",
      "/students": "Students",
      "/groups": "Groups",
      "/courses": "Courses",
      "/payments": "Payments",
      "/settings": "Settings",
      "/profile": "Profile",
      "/exit": "Exit",
    };
    return map[location.pathname] || "Sahifa";
  }, [location.pathname]);


  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        px: 4,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight="bold">
          {pageTitle}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Avatar src={user.avatar} sx={{ width: 40, height: 40, mr: 1 }} />
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.firstName || "Ism"} {user.lastName || "Familiya"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: mode === "dark" ? "#bbb" : "#0a0a0aff" }}
              >
                {user.email || "Email"}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
