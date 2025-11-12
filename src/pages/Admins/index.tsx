import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UserTable from "../../components/Table/UserTable";
import { getAllAdmins } from "../../api/admin";

const Admins = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await getAllAdmins();
        console.log("Backenddan admin ", res);

        if (Array.isArray(res.data)) {
          setRows(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setRows(res.data.data);
        } else {
          console.error("", res);
          setRows([]);
        }
      } catch (err) {
        console.error("", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          backgroundColor: "black", 
          minHeight: "100vh",       
          alignItems: "center",     
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "black", 
        minHeight: "100vh",
        color: "#fff",             
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: "#fff" }}>
        Adminlar ro‘yxati
      </Typography>
      <UserTable rows={rows} />
    </Box>
  );
};

export default Admins;
