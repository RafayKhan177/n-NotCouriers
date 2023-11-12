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
// import generateAndOpenPDF from "@/api/GeneratePDF";

export default function RecentInvoices({ invoices, viewInvoices }) {
  //   const template = {
  //     // ... Your template definition
  //   };

  //   const sampleData = {
  //     image: "path/to/your/image.jpg",
  //     date: "2023-11-12",
  //     jobNo: "12345",
  //     ref1: "ABC123",
  //     ref2: "XYZ789",
  //     from: "Origin City",
  //     to: "Destination City",
  //     service: "Express Delivery",
  //     cost: "$100",
  //     gst: "$10",
  //     total: "$110",
  //   };

  //   const handleViewEntry = (row) => {
  // generateAndOpenPDF(template, sampleData);
  //   };

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
                    onClick={() => handleViewEntry(row)}
                  >
                    View This Entry
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
