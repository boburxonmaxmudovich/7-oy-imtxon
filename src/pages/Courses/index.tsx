import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Chip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string | number;
  title: string;
  description?: string;
  thumbnail?: string;
  studentsCount?: number;
  startDate?: string;
}

type Props = {
  apiUrl?: string;
  useAxiosClient?: boolean;
};

export default function CourseCardsFlex({ apiUrl = "/api/courses", useAxiosClient = false }: Props) {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function fetchCourses() {
      setLoading(true);
      setError(null);
      try {
        const client = useAxiosClient ? (await import("../../api/axiosClient")).default : axios;
        const res = await client.get(apiUrl);
        const payload = res.data && Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        if (mounted) setCourses(payload);
      } catch (err: any) {
        if (mounted) setError(err?.message || "Kurslarni yuklashda xatoli boo");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCourses();
    return () => {
      mounted = false;
    };
  }, [apiUrl, useAxiosClient]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" mb={1}>
          Xatoli
        </Typography>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );

  if (!courses || courses.length === 0)
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6">Kurslar mavjud emas</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "flex-start",
      }}
    >
      {courses.map((c) => (
        <Card
          key={c.id}
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {c.thumbnail ? (
            <CardMedia component="img" height="160" image={c.thumbnail} alt={c.title} />
          ) : (
            <Box
              sx={{
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Surat mavjud emas
              </Typography>
            </Box>
          )}

          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
                {c.title}
              </Typography>
              {c.startDate && (
                <Chip label={new Date(c.startDate).toLocaleDateString()} size="small" />
              )}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 48 }}>
              {c.description
                ? c.description.length > 140
                  ? c.description.slice(0, 137) + "..."
                  : c.description
                : "Kurs haqida ma'lumot yo"}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {typeof c.studentsCount === "number" ? `${c.studentsCount} o'quvchi` : "O'quvchila soni mavjud mass"}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
            <Button size="small" onClick={() => navigate(`/courses/${c.id}`)}>
              Batafsil
            </Button>
            <IconButton onClick={() => window.open(`/courses/${c.id}`, "_blank")} aria-label="open">
              <OpenInNewIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
