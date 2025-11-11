import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface Staff {
  id: string | number;
  name: string;
  role: string;
  status: string;
}

export default function HomeAllStaff() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchStaff() {
      try {
        setLoading(true);
        const res = await axios.get("/api/staff/all");
        const data: Staff[] = res.data?.data ?? res.data ?? [];
        if (mounted) setStaffList(data);
      } catch (err: any) {
        console.error("Staff fetch error:", err);
        if (mounted) setError(err?.message || "Xatolik yuz berdi");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStaff();
    return () => { mounted = false; };
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", py: 6 }}>
        {error}
      </Typography>
    );

  if (staffList.length === 0)
    return (
      <Typography sx={{ textAlign: "center", py: 6 }}>
        Hozircha ma’lumot mavjud emas
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {staffList.map((staff) => (
        <Card key={staff.id} sx={{ width: 250 }}>
          <CardContent>
            <Typography variant="h6">{staff.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Rol: {staff.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {staff.status}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
