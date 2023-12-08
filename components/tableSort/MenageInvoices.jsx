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
import PdfButton from "../PdfButton";

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

export default function MenageInvoices({ invoice, title }) {
  const router = useRouter();
  const handleEdit = (id) => {
    router.push(`/admin/Invoices/${id}`);
  };
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

  const renderTableRow = (row) => (
    <TableRow key={row.docId}>
      <TableCell>{title}</TableCell>
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
      {/* <TableCell>address</TableCell>
      <TableCell>address</TableCell> */}
      <TableCell>
        {(row.serviceInformation && row.serviceInformation.service) ||
          row.service}
      </TableCell>
      <TableCell>
        {(row.progressInformation && row.progressInformation.booked) ||
          "Pending"}
      </TableCell>
      <TableCell>
        {(row.progressInformation && row.progressInformation.delivered) ||
          "Pending"}
      </TableCell>
      <TableCell>
        <Button
        mr={5}
          variant="light"
          color="#F14902"
          onClick={() => handleEdit(row.docId)}
        >
          Edit
        </Button>
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
      <h1>Manage {title}</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job Type</TableCell>
            <TableCell>Job Number</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Booked</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice && invoice.map(renderTableRow)}
          {/* {place_job && place_job.map(renderTableRow)} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
