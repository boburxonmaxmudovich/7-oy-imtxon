import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getAllGroups } from "../../api/groups";
import { useThemeMode } from "../../context/ThemeContext";

const Groups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { mode } = useThemeMode();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await getAllGroups();
        setGroups(res?.data || []);
      } catch (err) {
        console.error("Gruhlarni olishda xatolik:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5, }}>
        <CircularProgress sx={{ color:"green"}} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: mode === "dark" ? "#fff" : "#222",
        }}
      >
        Guruhlar ro‘yxati
      </Typography>

      <Table
        sx={{
          backgroundColor: mode === "dark" ? "#121212" : "#fff",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <TableHead>
          <TableRow>
            {[
              "No",
              "Guruh nomi",
              "Ustoz",
              "O‘quvchilar soni",
              "Boshlangan vaqti",
              "Tugagan vaqti",
              "Amallar",
            ].map((title) => (
              <TableCell
                key={title}
                sx={{
                  color: mode === "dark" ? "#ccc" : "#333",
                  fontWeight: "bold",
                  borderBottom: "1px solid #444",
                }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group, index) => (
            <TableRow key={group.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{group.title || "-"}</TableCell>
              <TableCell>
                {group.teacher?.fullName || "Ustoz belgilanmagan"}
              </TableCell>
              <TableCell>{group.studentCount ?? 0}</TableCell>
              <TableCell>
                {group.startTime
                  ? new Date(group.startTime).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell>
                {group.endTime
                  ? new Date(group.endTime).toLocaleString()
                  : "Davom etmoqda"}
              </TableCell>
              <TableCell>
                <IconButton>
                  <MoreVertIcon
                    sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Groups;
