"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mantine/core";
import Link from "next/link";

const BookingTable = ({ bookings }) => {
  console.log(bookings);
  return (
    <TableContainer component={Paper} className="table-container">
      <Table className="booking-table">
        <TableHead>
          <TableRow>
            <TableCell>Job No</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Ref1</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Booked</TableCell>
            <TableCell>Delivered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.docId}>
              <TableCell>{booking.docId}</TableCell>
              <TableCell>
                {booking.serviceInformation &&
                  booking.serviceInformation.date &&
                  booking.serviceInformation.time &&
                  booking.serviceInformation.date +
                    " " +
                    booking.serviceInformation.time}
              </TableCell>
              <TableCell>
                {booking.dropDetails && booking.dropDetails.dropReference1}
              </TableCell>
              <TableCell>
                {booking?.pickupDetails?.selectedOriginDetails?.address ===
                "none"
                  ? booking?.pickupDetails?.pickupFrequentAddress?.address
                  : booking?.pickupDetails?.selectedOriginDetails?.address}
              </TableCell>
              <TableCell>
                {booking?.dropDetails?.selectedDestinationDetails?.address ===
                "none"
                  ? booking?.dropDetails?.dropFrequentAddress?.address
                  : booking?.dropDetails?.selectedDestinationDetails?.address}
              </TableCell>
              <TableCell>
                {booking.serviceInformation &&
                  booking.serviceInformation.service}
              </TableCell>
              <TableCell>${booking.totalPrice}</TableCell>
              <TableCell>
                {(booking.progressInformation &&
                  booking.progressInformation.booked) ||
                  "Pending"}
              </TableCell>
              <TableCell>
                {(booking.progressInformation &&
                  booking.progressInformation.delivered) ||
                  "Pending"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BookingsQuery = ({ bookings }) => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h2>Track Booking</h2>
      <BookingTable bookings={bookings} />
      <Link style={{ textDecoration: "none" }} href="/ClientServices">
        <Button variant="filled" color="#F14902" size="lg">
          Client Services
        </Button>
      </Link>
    </section>
  );
};

export default BookingsQuery;
