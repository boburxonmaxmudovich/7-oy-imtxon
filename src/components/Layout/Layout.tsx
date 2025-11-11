import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", height: "2500px" }}>
      <Sidebar />
      <Box component="main" sx={{ width:'100%', my:-1, bgcolor: "background.default", color: "text.primary" }}>
        <Navbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}

