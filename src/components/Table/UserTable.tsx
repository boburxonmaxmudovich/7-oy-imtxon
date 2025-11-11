import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface UserTableProps {
  rows: any[];
}

const UserTable: React.FC<UserTableProps> = ({ rows }) => {
  if (!Array.isArray(rows)) {
    console.error("rows massiv emas:", rows);
    return <div>Xatoli ---- notori ma’lumoti formati oka</div>;
  }

  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{  }}>Ism</TableCell>
            <TableCell sx={{  }}>Familiya</TableCell>
            <TableCell sx={{  }}>Email</TableCell>
            <TableCell sx={{  }}>Rol</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row: any) => (
              <TableRow key={row._id || row.id}>
                <TableCell sx={{ }}>{row.first_name}</TableCell>
                <TableCell sx={{ }}>{row.last_name}</TableCell>
                <TableCell sx={{ }}>{row.email}</TableCell>
                <TableCell sx={{ }}>{row.role}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ color: "#888", textAlign: "center" }}>
                Ma’lumot topilmadi oka 
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
