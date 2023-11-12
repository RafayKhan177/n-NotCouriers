"use client";

import React, { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import { postDoc, addFrequentAddress } from "@/api/firebase/functions/upload";
import { fetchFrequentAddresses } from "@/api/firebase/functions/fetch";
import { PlacesAutocomplete } from "@/components/Index";
import { Button, Divider, div } from "@mantine/core";
import { serviceOptions, suburbOption } from "@/components/static";
import { calculateDistance } from "@/api/distanceCalculator";
import { calculatePrice } from "@/api/priceCalculator";

export default function Page() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFrequentAddresses();
        setFrequentAddresses(data);
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

  const [role, setRole] = useState(null);
  useEffect(() => {
    const role =
      (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role);
  }, []);

  if (role === null) {
    return <p>Please log in</p>;
  }

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

  return (
    <section style={grid}>
      <div style={gridChild}>
        {/* col1 */}
        <div>
          <h3>Job Information</h3>
          <p>
            Account <span>Lorem, ipsum dolor.</span>{" "}
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
          <h3>Service Information</h3>
          <TextField
            style={styleField}
            name="service"
            select
            label="Service"
            helperText="Please select your currency"
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Basic date picker"
              value={formData.date}
              onChange={handleDateChange}
            />
            <TimePicker
              label="Basic time picker"
              value={formData.time}
              onChange={handleTimeChange}
            />
          </LocalizationProvider>
        </div>
      </div>

      <Divider style={{ maxWidth: "6rem", color: "red" }} />

      <div style={gridChild}>
        <div>
          <h3>Pickup Details</h3>

          <PlacesAutocomplete onLocationSelect={handleDestination} />

          <TextField
            style={styleField}
            name="pickupFrequentAddress"
            select
            label="Frequent Address"
            helperText="Please select your currency"
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
            helperText="Please select your currency"
            variant="outlined"
            value={formData.pickupSuburb}
            onChange={handleChange}
          >
            {suburbOption &&
              suburbOption.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
          </TextField>

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

        <div>
          <h3>Drop Details</h3>
          <TextField
            style={styleField}
            name="dropFrequentAddress"
            select
            label="Frequent Address"
            helperText="Please select your currency"
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
            helperText="Please select your currency"
            variant="outlined"
            value={formData.dropSuburb}
            onChange={handleChange}
          >
            {suburbOption &&
              suburbOption.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            style={styleField}
            name="dropReference1"
            label="Reference 1"
            multiline
            maxRows={4}
            value={formData.reference1}
            onChange={handleChange}
          />

          <PlacesAutocomplete onLocationSelect={handleOrigin} />
        </div>
        <Divider style={{ margin: ".7rem" }} />
        <Button variant="filled" color="red" onClick={submit}>
          Book Job
        </Button>
      </div>
    </section>
  );
}
