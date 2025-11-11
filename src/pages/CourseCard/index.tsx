import { Card, CardContent, Typography } from "@mui/material";

export default function CourseCard({ course }: { course: any }) {
  return (
    <Card
      sx={{
        p: 2,
        width: 260,
        backgroundColor: "#121212",
        color: "#fff",
        borderRadius: 3,
        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 0 25px rgba(255,255,255,0.2)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {course.name || "Noma’lum kurs"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Yo‘nalish: {course.field || "-"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Narxi: {course.price ? `${course.price} so‘m` : "Noma’lum"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: course.is_freeze ? "orange" : "lightgreen",
            fontWeight: 600,
          }}
        >
          {course.is_freeze ? "Muzlatilgan" : "Aktiv turibtiku"}
        </Typography>
      </CardContent>
    </Card>
  );
}
