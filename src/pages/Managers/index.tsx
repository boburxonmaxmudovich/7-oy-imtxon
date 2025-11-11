import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UserTable from "../../components/Table/UserTable";
import { getAllManagers } from "../../api/managers";

const Managers = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await getAllManagers();
        console.log("Backenddan javob:", res);

        if (Array.isArray(res.data)) {
          setRows(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setRows(res.data.data);
        } else {
          console.error("Backend notori formatda oka _", res);
          setRows([]);
        }
      } catch (err) {
        console.error("Managerlani olishda xatolibor ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          minHeight: "100vh",
          alignItems: "center",
          backgroundColor: "black", // loading fon qora
        }}
      >
        <CircularProgress sx={{ color: "green" }} /> {/* loading indicator yashil */}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "black", // sahifa fon qora
        minHeight: "100vh",
        color: "#fff",             // text oq
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, color: "#fff" }}>
        Menejerlani ro‘yxati oka
      </Typography>
      <UserTable rows={rows} />
    </Box>
  );
};

export default Managers;
  