"use client";

import React, { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { postDoc, addFrequentAddress } from "@/api/firebase/functions/upload";
import {
  fetchDocById,
  fetchFrequentAddresses,
} from "@/api/firebase/functions/fetch";
import { CAP, PlacesAutocomplete } from "@/components/Index";
import { Button, Divider } from "@mantine/core";
import { serviceOptions } from "@/components/static";
import { calculateDistance } from "@/api/distanceCalculator";
import { calculatePrice } from "@/api/priceCalculator";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Page() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFrequentAddresses();
        setFrequentAddresses(data);
        const suburbData = await fetchDocById("options", "data");
        const suburbs = await suburbData.suburb;
        setSuburbOptions(suburbs);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);
  // -------------------------------State
  const initialFormData = {
    contact: "",
    service: "",
    date: null,
    time: null,
    pieces: "",
    weight: "",
    pickupFrequentAddress: "",
    pickupGoodsDescription: "",
    dropFrequentAddress: "",
    dropReference1: "",
    dropSuburb: "",
    pickupSuburb: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [suburbOptions, setSuburbOptions] = useState([]);
  const [frequentAddresses, setFrequentAddresses] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedOrigin, setselectedOrigin] = useState(null);
  // -----------------------------State Handlers
  const emptyAllFields = () => {
    setFormData(initialFormData);
    setFrequentAddresses([]);
    setSelectedDestination(null);
    setselectedOrigin(null);
  };
  const handleDestination = (location) => {
    setSelectedDestination(location);
  };

  const handleOrigin = (location) => {
    setselectedOrigin(location);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (date) => {
    const formattedDate = date.format("MM/DD/YYYY");
    setFormData({ ...formData, date: formattedDate });
  };
  const handleTimeChange = (time) => {
    const formattedTime = time.format("LT", { locale: "en-US" });
    setFormData({ ...formData, time: formattedTime });
  };

  // -----------------------------Submit
  const submit = async () => {
    try {
      const requiredFields = [
        "contact",
        "pickupGoodsDescription",
        "service",
        "date",
        "time",
        "pieces",
        "weight",
        "dropSuburb",
        "pickupSuburb",
      ];

      // Check if any required field is missing
      if (requiredFields.some((field) => !formData[field])) {
        alert("Please fill in all required fields.");
      }

      const {
        contact,
        pickupFrequentAddress,
        pickupGoodsDescription,
        service,
        date,
        time,
        pieces,
        weight,
        dropFrequentAddress,
        dropReference1,
        dropSuburb,
        pickupSuburb,
      } = formData;

      const selectedOriginDetails = {
        address: selectedOrigin.label,
        coordinates: selectedOrigin.coordinates,
      };

      const selectedDestinationDetails = {
        address: selectedDestination.label,
        coordinates: selectedDestination.coordinates,
      };

      const [pickupDetails, serviceInformation, dropDetails, distanceData] =
        await Promise.all([
          {
            pickupFrequentAddress,
            selectedOriginDetails,
            pickupGoodsDescription,
            pickupSuburb,
          },
          {
            service,
            date,
            time,
            pieces,
            weight,
          },
          {
            dropFrequentAddress,
            selectedDestinationDetails,
            dropSuburb,
            dropReference1,
          },
          calculateDistance(
            selectedOrigin.coordinates,
            selectedDestination.coordinates
          ).then((data) => data.rows[0].elements[0]),
        ]);

      const data = {
        contact,
        pickupDetails,
        dropDetails,
        serviceInformation,
        distanceData,
      };

      const invoice = await calculatePrice(data);
      emptyAllFields();

      await Promise.all([
        postDoc(invoice, "place_bookings"),
        addFrequentAddress({ contact, ...selectedOriginDetails }),
        addFrequentAddress({ contact, ...selectedDestinationDetails }),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const styleField = {
    minWidth: "20rem",
    width: "100%",
    margin: ".8rem 0",
    minWidth: "10rem",
  };

  const grid = {
    margin: "0 13%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };

  const gridChild = {
    width: "23rem",
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDoc")) || {} || null;
    setUser(user);
  }, []);

  if (user && user.role === null) {
    return <CAP status={"notLoggedIn"} />;
  }

  return (
    <section style={grid}>
      <div style={gridChild}>
        {/* col1 */}
        <div>
          <h3>Job Information</h3>
          <p>
            Account{" "}
            <span>{user && user.firstName + " " + user && user.lastName}</span>
          </p>
          <TextField
            style={styleField}
            name="contact"
            label="Contact"
            variant="outlined"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Pickup Details</h3>

          <TextField
            style={styleField}
            name="pickupFrequentAddress"
            select
            label="Frequent Address"
            helperText="Please select your address"
            variant="outlined"
            value={formData.pickupFrequentAddress}
            onChange={handleChange}
          >
            {frequentAddresses &&
              frequentAddresses.map((option, index) => (
                <MenuItem key={index} value={option.address}>
                  {option.address}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            style={styleField}
            name="pickupSuburb"
            select
            label="Drop Suburb"
            helperText="Please select your suburb"
            variant="outlined"
            value={formData.pickupSuburb}
            onChange={handleChange}
          >
            {suburbOptions &&
              suburbOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>

          <PlacesAutocomplete onLocationSelect={handleDestination} />

          <TextField
            style={styleField}
            name="pickupGoodsDescription"
            label="Goods Description"
            multiline
            maxRows={4}
            value={formData.goodsDescription}
            onChange={handleChange}
          />
        </div>
      </div>

      <Divider style={{ maxWidth: "6rem", color: "red" }} />

      <div style={gridChild}>
        <div>
          <h3>Service Information</h3>
          <TextField
            style={styleField}
            name="service"
            select
            label="Service"
            helperText="Please select any service"
            variant="outlined"
            value={formData.service}
            onChange={handleChange}
          >
            {serviceOptions &&
              serviceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date picker"
              value={formData.date}
              onChange={handleDateChange}
            />
            <p style={{ margin: "none", height: "5px", color: "ghostwhite" }}>
              ...
            </p>
            <TimePicker
              style={{ margin: "1rem 0" }}
              label="Time picker"
              value={formData.time}
              onChange={handleTimeChange}
            />
          </LocalizationProvider>
          <TextField
            style={styleField}
            name="pieces"
            label="Pieces"
            multiline
            maxRows={4}
            value={formData.pieces}
            onChange={handleChange}
          />
          <TextField
            style={styleField}
            name="weight"
            label="Weight (kg)"
            multiline
            maxRows={4}
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3>Drop Details</h3>
          <TextField
            style={styleField}
            name="dropFrequentAddress"
            select
            label="Frequent Address"
            helperText="Please select your address"
            variant="outlined"
            value={formData.dropFrequentAddress}
            onChange={handleChange}
          >
            {frequentAddresses &&
              frequentAddresses.map((option, index) => (
                <MenuItem key={index} value={option.address}>
                  {option.address}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            style={styleField}
            name="dropSuburb"
            select
            label="Drop Suburb"
            helperText="Please select your suburb"
            variant="outlined"
            value={formData.dropSuburb}
            onChange={handleChange}
          >
            {suburbOptions &&
              suburbOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>

          <PlacesAutocomplete onLocationSelect={handleOrigin} />

          <TextField
            style={styleField}
            name="dropReference1"
            label="Reference 1"
            multiline
            maxRows={4}
            value={formData.reference1}
            onChange={handleChange}
          />
        </div>
        <Button variant="filled" color="red" onClick={submit}>
          Book Job
        </Button>
      </div>
    </section>
  );
}
