import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UserTable from "../../components/Table/UserTable";
import { getAllStudents } from "../../api/students";

const Students = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudents();
        console.log("O‘quvchila ", res);

        if (Array.isArray(res.data)) {
          setRows(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setRows(res.data.data);
        } else {
          console.error("Backend notori formatda keldi ", res);
          setRows([]);
        }
      } catch (err) {
        console.error("O‘quvchilarni olishda xato boo ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress sx={{ color: "green" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        O‘quvchilani ro‘yxati
      </Typography>
      <UserTable rows={rows} />
    </Box>
  );
};

export default Students;
