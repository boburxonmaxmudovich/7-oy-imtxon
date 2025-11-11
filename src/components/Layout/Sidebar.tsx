import { Drawer, List, ListItemButton, ListItemText, Typography, Divider, Box } from "@mui/material"; 
import { Link, useLocation } from "react-router-dom";
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import SupervisorAccountSharpIcon from '@mui/icons-material/SupervisorAccountSharp';
import FollowTheSignsSharpIcon from '@mui/icons-material/FollowTheSignsSharp';
import CoPresentSharpIcon from '@mui/icons-material/CoPresentSharp';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import PaymentSharpIcon from '@mui/icons-material/PaymentSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const menuItems = [
  { section: "Menu", items: [
      { text: "Asosiy", icon: <HomeSharpIcon />, path: "/" },
      { text: "Menegerlar", icon: <SupervisorAccountSharpIcon />, path: "/managers" },
      { text: "Adminlar", icon: <PersonAddAltSharpIcon />, path: "/admins" },
      { text: "Ustozlar", icon: <CoPresentSharpIcon />, path: "/teachers" },
      { text: "Studentlar", icon: <FollowTheSignsSharpIcon />, path: "/students" },
      { text: "Guruhlar", icon: <PeopleSharpIcon />, path: "/groups" },
      { text: "Kurslar", icon: <MenuBookSharpIcon />, path: "/courses" },
      { text: "Payment", icon: <PaymentSharpIcon />, path: "/payment" },
  ]},
  { section: "Boshqalar", items: [
      { text: "Sozlamalar", icon: <SettingsSharpIcon />, path: "/settings" },
      { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
      { text: "Chiqish", icon: <ExitToAppSharpIcon />, path: "/exit" },
  ]},
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Drawer
  variant="permanent"
  sx={{
    width: 340,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 300,
      bgcolor: "#000", // <--- qora fon
      color: "#FFFFFF",
      borderRight: "1px solid #333",
      padding:"20px"
    },
  }}
>
  {menuItems.map((section) => (
    <Box key={section.section} sx={{ mb: 2 }}>
        <h1>Admin CRM</h1>
        
      <Typography
        sx={{
          px: 2,
          pt: 2,
          pb: 1,
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: 12,
          color: "#bbb", 
        }}
      >
        {section.section}
      </Typography>
      <List>
        {section.items.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={pathname === item.path}
            sx={{
              py: "12px",
              px: 2,
              "&.Mui-selected": { bgcolor: "#222", borderRadius: "6px" }, // tanlangan element biroz qoraroq
              "&:hover": { bgcolor: "#111", borderRadius: "6px" }, // hover qoraroq
            }}
          >
            <span style={{ marginRight: 20 }}>{item.icon}</span>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ borderColor: "#333" }} />
    </Box>
  ))}
</Drawer>

  );
}
