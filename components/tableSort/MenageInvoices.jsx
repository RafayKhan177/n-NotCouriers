"use client";
import { Button } from "@mantine/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function MenageInvoices({ invoices }) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/admin/MenageInvoices/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice(Excl)</TableCell>
            <TableCell>GST</TableCell>
            <TableCell>Invoice(Incl)</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices &&
            invoices.map((row, index) => (
              <TableRow key={index + 1}>
                <TableCell>{row.docId}</TableCell>
                <TableCell>{row.serviceInformation.date}</TableCell>
                <TableCell>{row.serviceInformation.time}</TableCell>
                <TableCell>{0.0}</TableCell>
                <TableCell>{0.0}</TableCell>
                <TableCell>{0.0}</TableCell>
                <TableCell>
                  <Button
                    variant="light"
                    color="cyan"
                    onClick={() => handleEdit(row.docId)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
