"use client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { TextField, Grid } from "@mui/material";
import { Button } from "@mantine/core";
import { getBookingsBetweenDates } from "@/api/firebase/functions/fetch";
import { BookingsQuery } from "@/components/Index";

const styleField = {
  width: "16rem",
};

const containerStyle = {
  marginTop: "5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
    <div>
      {show ? (
        <>
          <BookingsQuery bookings={bookings} />
        </>
      ) : (
        <>
          <Grid container style={containerStyle}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={formData.fromDate}
                  onChange={(date) => handleDateChange(date, "fromDate")}
                />
                <p style={{ color: "ghostwhite" }}>...</p>
                <DatePicker
                  label="To Date"
                  value={formData.toDate}
                  onChange={(date) => handleDateChange(date, "toDate")}
                />
                <p style={{ color: "ghostwhite" }}>...</p>
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
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
