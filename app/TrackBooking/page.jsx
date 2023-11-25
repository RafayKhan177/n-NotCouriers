"use client";
import { useState } from "react";
import { TextField, Grid } from "@mui/material";
import { Button } from "@mantine/core";
import { getBookingsBetweenDates } from "@/api/firebase/functions/fetch";
import { BookingsQuery } from "@/components/Index";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Link from "next/link";

const styleField = {
  width: "16rem",
};

const containerStyle = {
  marginTop: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export default function Page() {
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    fromDate: null,
    toDate: null,
    reference: "", // Corrected the spelling of "reference"
  });

  const handleDateChange = (date, field) => {
    const formattedDate = date.format("MM/DD/YYYY");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formattedDate,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const bookings = await getBookingsBetweenDates(
        formData.fromDate,
        formData.toDate,
        formData.reference
      );
      if (!bookings.length) {
        alert("Not Found");
        return;
      }
      setBookings(bookings);
      setShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      {show ? (
        <>
          <BookingsQuery bookings={bookings} />
        </>
      ) : (
        <>
          <Grid container style={containerStyle}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>TRACK BOOKINGS</h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={formData.fromDate}
                  onChange={(date) => handleDateChange(date, "fromDate")}
                />
                <p style={{ color: "ghostwhite", height: "5px" }}>...</p>
                <DatePicker
                  label="To Date"
                  value={formData.toDate}
                  onChange={(date) => handleDateChange(date, "toDate")}
                />
                <p style={{ color: "ghostwhite", height: "5px" }}>...</p>
              </LocalizationProvider>
              <TextField
                style={styleField}
                name="reference"
                label="Reference Search"
                variant="outlined"
                value={formData.reference}
                onChange={handleChange}
              />
              <p style={{ color: "ghostwhite" }}>...</p>

              <Button
                onClick={() => handleSubmit()}
                variant="filled"
                color="red"
                size="lg"
                style={styleField}
              >
                Run Query
              </Button>
              <Link href="/ClientServices" style={{ textDecoration: "none" }}>
                <Button
                  style={styleField}
                  variant="filled"
                  mt={10}
                  color="red"
                  size="lg"
                >
                  Client Services
                </Button>
              </Link>
            </div>
          </Grid>
        </>
      )}
    </div>
  );
}
