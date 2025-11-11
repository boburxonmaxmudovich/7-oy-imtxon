import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UserTable from "../../components/Table/UserTable";
import { getAllTeachers } from "../../api/teachers";

const Teachers = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await getAllTeachers();
        console.log("Backenddan teacherla -", res);

        if (Array.isArray(res.data)) {
          setRows(res.data);
        } else if (Array.isArray(res.data?.data)) {
          setRows(res.data.data);
        } else {
          console.error("Backend notori formatda !!!!!", res);
          setRows([]);
        }
      } catch (err) {
        console.error("Teacherlarni olishda xatoli boo", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
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
        O‘qituvchilani ro‘yxati
      </Typography>
      <UserTable rows={rows} />
    </Box>
  );
};

export default Teachers;
