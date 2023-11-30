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
import { PdfButton } from "@/components/Index";
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

  return `${dayOfMonth}-${monthName.toUpperCase()}-${yearDigits}`;
}

function getFormattedDateJob(dateStr) {
  const [month, day, year] = dateStr.split("/");
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

  return `${dayOfMonth}-${monthName.toUpperCase()}-${yearDigits}`;
}

function formatTimeTo12Hour(timeStr) {
  // Parse the input time string
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  // Create a Date object to utilize the built-in formatting options
  const formattedTime = new Date();
  formattedTime.setHours(hours, minutes, seconds);

  // Use Intl.DateTimeFormat to get the time in 12-hour format with 'AM' or 'PM'
  const formattedTimeString = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(formattedTime);

  return formattedTimeString;
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
          : formatTimeTo12Hour(row.time)}
      </TableCell>
      <TableCell>$ {row.totalPrice}</TableCell>
      <TableCell>
        <Button
          variant="light"
          color="cyan"
          onClick={() => handleNavigate(row.docId)}
        >
          View
        </Button>
      </TableCell>
      <TableCell>
        <PdfButton
          invoice={row}
          s={row?.service || "N/A"}
          d={row?.date || "N/A"}
        />
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
            <TableCell>Job Type</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>View</TableCell>
            <TableCell>Download Invoice</TableCell>
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
