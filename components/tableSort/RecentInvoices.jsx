"use client";
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
import { useRouter } from "next/navigation";

function getFormattedDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  const formattedDate = new Date(`${month}/${day}/${year}`);

  if (isNaN(formattedDate)) {
    console.error(`Invalid date: ${dateStr}`);
    return null;
  }

  const dayOfMonth = formattedDate.getDate();
  const monthName = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(formattedDate);
  const yearDigits = formattedDate.getFullYear();

  return `${dayOfMonth}/${monthName.toUpperCase()}/${yearDigits}`;
}

function getFormattedDateJob(dateStr) {
  // Extract month, day, and year components
  const [month, day, year] = dateStr.split("/");

  // Create a new date using the rearranged components
  const formattedDate = new Date(`${month}/${day}/${year}`);

  // Check if the date is valid before formatting
  if (isNaN(formattedDate)) {
    console.error(`Invalid date: ${dateStr}`);
    return null; // or throw an error, depending on your use case
  }

  const dayOfMonth = formattedDate.getDate();
  const monthName = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(formattedDate);
  const yearDigits = formattedDate.getFullYear();

  return `${dayOfMonth}/${monthName.toUpperCase()}/${yearDigits}`;
}


export default function RecentInvoices({ place_booking, place_job }) {
  const router = useRouter();

  console.log(place_booking, place_job);

  const handleNavigate = (id) => {
    router.push(`/RecentInvoices/${id}`);
  };

  const renderTableRow = (row, cat) => (
    <TableRow key={row.docId}>
      <TableCell>{cat}</TableCell>
      <TableCell>{row.docId}</TableCell>
      <TableCell>
        {row.serviceInformation
          ? getFormattedDateJob(row.serviceInformation.date)
          : getFormattedDate(row.date)}
      </TableCell>
      <TableCell>
        {row.serviceInformation
          ? row.serviceInformation.time
          : getFormattedDateJob(row.time)}
      </TableCell>
      <TableCell>{row.totalPrice}</TableCell>
      <TableCell>
        <Button
          variant="light"
          color="cyan"
          onClick={() => handleNavigate(row.docId)}
        >
          View This Entry
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="light"
          color="dark"
          // onClick={() => handle#(row.docId)}
        >
          PDF
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer
      component={Paper}
      style={{ width: "80%", margin: "2rem auto" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice(Incl)</TableCell>
            <TableCell>View</TableCell>
            <TableCell>PDF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {place_booking &&
            place_booking.map((row) => renderTableRow(row, "Booking"))}
          {place_job && place_job.map((row) => renderTableRow(row, "Job"))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
