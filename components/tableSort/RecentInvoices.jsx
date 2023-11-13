import React from "react";
import { Button } from "@mantine/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function RecentInvoices({ place_booking, place_job }) {
  const handleViewEntry = (row) => {
    // Implement your handleViewEntry logic
    console.log("Viewing entry:", row);
  };

  const renderTableRow = (row) => (
    <TableRow key={row.docId}>
      <TableCell>{row.docId}</TableCell>
      <TableCell>{row.serviceInformation ? row.serviceInformation.date : row.date}</TableCell>
      <TableCell>{row.serviceInformation ? row.serviceInformation.time : row.time}</TableCell>
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
  );

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
          {place_booking && place_booking.map(renderTableRow)}
          {place_job && place_job.map(renderTableRow)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
