import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useThemeMode } from "../../context/ThemeContext";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
}

const initialData: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  avatar: "",
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>(initialData);
  const { mode } = useThemeMode();

  useEffect(() => {
    const fetchUser = async () => {
      const savedUser = localStorage.getItem("userProfile");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser({
          firstName: "Otabek",
          lastName: "Makhamatov",
          email: "otabek@example.com",
          role: "Admin",
          avatar: "",
        });
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    console.log("User data saqlandi:", user);
  };

  const handlePasswordChange = () => {
    console.log("Parolni o‘zgartirish ishga tushdi");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: mode === "dark" ? "#fff" : "#000",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 6, position: "relative" }}>
        <Avatar
          src={user.avatar}
          sx={{
            width: 100,
            height: 100,
            mr: 3,
            border: "2px solid",
            borderColor: mode === "dark" ? "#fff" : "#000",
            transition: "0.3s",
            "&:hover": { opacity: 0.8, cursor: "pointer" },
          }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {user.firstName || "Ism"} {user.lastName || "Familiya"}
          </Typography>
          <Typography variant="body2" sx={{ color: mode === "dark" ? "#bbb" : "#555", mt: 0.5 }}>
            {user.email || "Email"} - {user.role || "Rol"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#888", mt: 0.5 }}>
            Qo‘shilgan sanasi: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        <IconButton
          component="label"
          sx={{
            ml: 2,
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: mode === "dark" ? "#333" : "#ddd",
            "&:hover": { backgroundColor: mode === "dark" ? "#555" : "#bbb" },
          }}
        >
        </IconButton>
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Profil ma'lumotlaringiz
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "#888" }}>
        Shaxsiy ma'lumotlaringizni o‘zgartiring
      </Typography>

      <Box
        component="form"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        {["firstName", "lastName", "email", "role"].map((field) => (
          <TextField
            key={field}
            label={field === "firstName" ? "Ism" : field === "lastName" ? "Familiya" : field === "email" ? "Email" : "Rol"}
            name={field}
            value={(user as any)[field]}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                "& fieldset": {
                  borderColor: mode === "dark" ? "#555" : "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: mode === "dark" ? "#888" : "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: mode === "dark" ? "#fff" : "#000",
                },
              },
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
        <Button
          variant="contained"
          onClick={handlePasswordChange}
          sx={{
            backgroundColor: mode === "dark" ? "#fff" : "#000",
            color: mode === "dark" ? "#000" : "#fff",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#ddd" : "#333",
            },
          }}
        >
          Parolni o‘zgartirish
        </Button>

        <Button
          onClick={handleSave}
          sx={{
            backgroundColor: mode === "dark" ? "#fff" : "#000",
            color: mode === "dark" ? "#000" : "#fff",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#ddd" : "#333",
            },
          }}
        >
          Saqlash
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
