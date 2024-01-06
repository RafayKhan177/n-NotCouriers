"use client";

import React, { useEffect, useState } from "react";
import { IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import {
  fetchDocById,
  fetchFrequentAddresses,
} from "@/api/firebase/functions/fetch";
import {
  CAP,
  PlacesAutocomplete,
  BookCheckout,
} from "@/components/Index";
import { Button } from "@mantine/core";
import { serviceOptions, goodsDescriptionOption } from "@/components/static";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InfoIcon from '@mui/icons-material/Info';
import Link from "next/link";

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
    LxWxH: "",
    pickupGoodsDescription: "",
    pickupFrequentAddress: [],
    dropFrequentAddress: [],
    dropReference1: "",
    dropSuburb: "",
    pickupSuburb: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [suburbOptions, setSuburbOptions] = useState([]);
  const [frequentAddresses, setFrequentAddresses] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedOrigin, setselectedOrigin] = useState(null);
  const [autoaddressAAP, setAutoaddressAAP] = useState(true);
  const [autoaddressAAD, setAutoaddressAAD] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  console.log(frequentAddresses);
  // -----------------------------State Handlers
  const handleCheckOut = () => {
    const { pickupSuburb, dropSuburb, service, pieces, weight } = formData;

    // Check if any required field is missing
    if (!service || !pieces || !weight) {
      alert("Please fill in all required fields");
      return;
    }

    // If all required fields are filled, proceed with checkout
    setShowCheckout(true);
  };

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
  const handleChangeAAP = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setAutoaddressAAP(false);
  };
  const handleChangeAAD = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setAutoaddressAAD(false);
  };
  const handleDateChange = (date) => {
    const formattedDate = date.format("MM/DD/YYYY");
    setFormData({ ...formData, date: formattedDate });
  };
  const handleTimeChange = (time) => {
    const formattedTime = time.format("LT", { locale: "en-US" });
    setFormData({ ...formData, time: formattedTime });
  };

  const styleField = {
    minWidth: "20rem",
    width: "70%",
    margin: ".8rem 0",
    minWidth: "10rem",
  };

  const grid = {
    margin: "0 13%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    overFlow: "none",
  };

  const gridChild = {
    width: "23rem",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDoc")) || {} || null;
    setUser(user);
  }, []);
  const role = (user && user.role) || null;

  if (role === null) {
    return <CAP status={"notLoggedIn"} />;
  } else if (role !== null && role === "user") {
    return <p>Restricted</p>;
  }


  const styleDescription = {
    color: '#757575', // Adjust the color as needed
    fontSize: '0.77rem', // Adjust the font size as needed
    marginTop: '0.5rem', // Adjust the margin as needed
    marginLeft: '0.8rem'
  };

  return (
    <>
      {showCheckout ? (
        <BookCheckout
          formData={formData}
          selectedDestination={selectedDestination}
          selectedOrigin={selectedOrigin}
        />
      ) : (
        <>
          <>
            <section style={grid}>
              <div style={gridChild}>
                <div style={{ height: "30rem" }}>
                  <h3>Job Information</h3>
                  <p>
                    Account{" "}
                    <span>
                      {user && user.firstName + " " + user && user.lastName}
                    </span>
                  </p>
                  <TextField
                    style={styleField}
                    name="contact"
                    label="Contact"
                    variant="outlined"
                    helperText="Enter contact information"
                    size="small"
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
                    size="small"
                    label="Frequent Address"
                    helperText="Select address or enter address below"
                    variant="outlined"
                    value={formData.pickupFrequentAddress}
                    onChange={handleChangeAAP}
                  >
                    {frequentAddresses &&
                      frequentAddresses.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option.address}
                        </MenuItem>
                      ))}
                  </TextField>

                  {autoaddressAAP === true ? (
                    <PlacesAutocomplete onLocationSelect={handleOrigin} />
                  ) : null}

                  <TextField
                    style={styleField}
                    name="goodsDescription"
                    select
                    size="small"
                    label="Goods Description"
                    helperText="Select goods description"
                    variant="outlined"
                    value={formData.goodsDescription}
                    onChange={handleChange}
                  >
                    {goodsDescriptionOption &&
                      goodsDescriptionOption.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                  </TextField>
                </div>
              </div>

              <div style={gridChild}>
                <div>
                  <h3>Service Information</h3>
                  <TextField
                    style={styleField}
                    name="service"
                    select
                    size="small"
                    label="Level of Service"
                    helperText="Please select any level of service"
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
                  <Tooltip style={{ marginTop: "1rem" }} title="
                  Standard - 4-6hrs completion time,
                  Express - 2-3hrs time frame,
                  Direct - Pickup and deliver ASAP.">
                    <IconButton
                      size="small"
                      edge="end"
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <div>
                      <DatePicker
                        label="Date"
                        value={formData.date}
                        helperText="Enter the Date"
                        onChange={handleDateChange}
                      />
                      <p style={styleDescription}>Enter the Date</p>

                      <TimePicker
                        style={{ margin: "1rem 0" }}
                        label="Time"
                        helperText="Enter the Time"
                        value={formData.time}
                        onChange={handleTimeChange}
                      />
                      <p style={styleDescription}>Enter the Time</p>
                    </div>

                  </LocalizationProvider>

                  <TextField
                    style={styleField}
                    name="pieces"
                    label="No. of Items"
                    helperText="Enter the number of items"
                    size="small"
                    multiline
                    maxRows={4}
                    value={formData.pieces}
                    onChange={handleChange}
                  />
                  <TextField
                    style={styleField}
                    name="weight"
                    label="Weight (kg)"
                    helperText="Enter the weight in (KG)"
                    size="small"
                    multiline
                    maxRows={4}
                    value={formData.weight}
                    onChange={handleChange}
                  />
                  <TextField
                    style={styleField}
                    name="LxWxH"
                    label="LxWxH"
                    size="small"
                    helperText="Enter the Length Width Height in (CM)"
                    multiline
                    value={formData.LxWxH}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <h3>Drop Details</h3>
                  <TextField
                    style={styleField}
                    name="dropFrequentAddress"
                    select
                    size="small"
                    label="Frequent Address"
                    helperText="Select address or enter address below"
                    variant="outlined"
                    value={formData.dropFrequentAddress}
                    onChange={handleChangeAAD}
                  >
                    {frequentAddresses &&
                      frequentAddresses.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option.address}
                        </MenuItem>
                      ))}
                  </TextField>

                  {autoaddressAAD === true ? (
                    <PlacesAutocomplete onLocationSelect={handleDestination} />
                  ) : null}

                  <TextField
                    style={styleField}
                    name="dropReference1"
                    label="Reference"
                    size="small"
                    multiline
                    maxRows={4}
                    helperText="Enter the reference code"
                    value={formData.reference1}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "2rem",
                flexDirection: "column",
              }}
            >
              <Button
                variant="filled"
                mt={10}
                color="#F14902"
                size="md"
                w={250}
                onClick={handleCheckOut}
              >
                Book Job
              </Button>

              <Link href="/ClientServices" style={{ textDecoration: "none" }}>
                <Button w={250} variant="filled" mt={10} color="#F14902" size="md">
                  Client Services
                </Button>
              </Link>
            </div>
          </>

        </>
      )}
    </>
  );
}
