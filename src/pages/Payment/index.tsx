import { useEffect, useState } from "react";
import { getPayments } from "../../api/payments";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPayments();
        console.log("Payments", res);
        setPayments(res);
      } catch (err) {
        console.error("Xatolik", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <Typography sx={{ color: "green", fontFamily: '"Bitcount Grid Single", sans-serif', textAlign: "center", mt: 3 }}>
      </Typography>
    );

  return (
    <Paper sx={{ p: 3, }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        To‘lovlani ro‘yxati
      </Typography>

      {payments.length === 0 ? (
        <Typography
          sx={{
            color: "green",
            fontFamily: '"Bitcount Grid Single", sans-serif',
            textAlign: "center",
          }}
        >
          Tolov amalga oshirilnmagan !
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Talaba</TableCell>
              <TableCell sx={{ color: "#fff" }}>Kurs</TableCell>
              <TableCell sx={{ color: "#fff" }}>Summa</TableCell>
              <TableCell sx={{ color: "#fff" }}>Turi</TableCell>
              <TableCell sx={{ color: "#fff" }}>Sana</TableCell>
              <TableCell sx={{ color: "#fff" }}>Holat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p: any, i: number) => (
              <TableRow key={i}>
                <TableCell sx={{ color: "#fff" }}>{p.student_name || "-"}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.course_name || "-"}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {p.amount ? `${p.amount} so‘m` : "-"}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {p.type || "-"}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {p.date ? new Date(p.date).toLocaleDateString("uz-UZ") : "-"}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      p.status === "success"
                        ? "lightgreen"
                        : p.status === "pending"
                          ? "orange"
                          : "red",
                  }}
                >
                  {p.status || "nomalum"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      : (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Talaba</TableCell>
            <TableCell sx={{ color: "#fff" }}>Kurs</TableCell>
            <TableCell sx={{ color: "#fff" }}>Summa</TableCell>
            <TableCell sx={{ color: "#fff" }}>Turi</TableCell>
            <TableCell sx={{ color: "#fff" }}>Sana</TableCell>
            <TableCell sx={{ color: "#fff" }}>Holat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p: any, i: number) => (
            <TableRow key={i}>
              <TableCell sx={{ color: "#fff" }}>{p.student_name || "-"}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{p.course_name || "-"}</TableCell>
              <TableCell sx={{ color: "#fff" }}>
                {p.amount ? `${p.amount} so‘m` : "-"}
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                {p.type || "malumot yoq"}
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>
                {new Date(p.date).toLocaleDateString("uz-UZ")}
              </TableCell>
              <TableCell
                sx={{
                  color:
                    p.status === "success"
                      ? "lightgreen"
                      : p.status === "pending"
                        ? "orange"
                        : "red",
                }}
              >
                {p.status || "nomoti ___"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )
    </Paper>
  );
}
