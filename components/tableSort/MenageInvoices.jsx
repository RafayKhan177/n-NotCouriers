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

export default function MenageInvoices({ place_booking, place_job }) {
  const router = useRouter();
  const handleEdit = (id) => {
    router.push(`/admin/MenageInvoices/${id}`);
  };

  function getAbbreviatedMonth(dateStr) {
    const [day, month, year] = dateStr.split("/");
    const formattedDate = new Date(`${month}/${day}/${year}`);

    if (isNaN(formattedDate)) {
      console.error(`Invalid date: ${dateStr}`);
      return null;
    }

    const monthAbbreviation = new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(formattedDate);

    return monthAbbreviation;
  }

  function getAbbreviatedMonthbooking(dateStr) {
    // Extract month, day, and year components
    const [month, day, year] = dateStr.split("/");

    // Create a new date using the rearranged components
    const formattedDate = new Date(`${month}/${day}/${year}`);

    // Check if the date is valid before formatting
    if (isNaN(formattedDate)) {
      console.error(`Invalid date: ${dateStr}`);
      return null; // or throw an error, depending on your use case
    }

    const monthAbbreviation = new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(formattedDate);

    return monthAbbreviation;
  }
  const renderTableRow = (row) => (
    <TableRow key={row.docId}>
      <TableCell>{row.docId}</TableCell>
      <TableCell>
        {row.serviceInformation
          ? getAbbreviatedMonthbooking(row.serviceInformation.date)
          : getAbbreviatedMonth(row.date)}
      </TableCell>
      <TableCell>
        {row.serviceInformation ? row.serviceInformation.time : row.time}
      </TableCell>
      <TableCell>{row.totalPrice}$</TableCell>
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
  );

  return (
    <TableContainer
      component={Paper}
      style={{ width: "80%", margin: "2rem auto" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice(Incl)</TableCell>
            <TableCell>Edit</TableCell>
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
