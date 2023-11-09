"use client"

import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers";
import { postDoc, addFrequentAddress } from '@/api/firebase/functions/upload'
import { fetchFrequentAddresses } from '@/api/firebase/functions/fetch'
import { PlacesAutocomplete } from "@/components/Index"
import { Grid } from '@mantine/core';
import { serviceOptions } from "@/components/static"
import { calculateDistance } from '@/api/distanceCalculator';

export default function Page() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFrequentAddresses();
        setFrequentAddresses(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
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
  };
  const [formData, setFormData] = useState(initialFormData);
  const [frequentAddresses, setFrequentAddresses] = useState([])
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [selectedOrigin, setselectedOrigin] = useState(null)
  // -----------------------------State Handlers
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
    const formattedDate = date.format('MM/DD/YYYY');
    setFormData({ ...formData, date: formattedDate });
  };
  const handleTimeChange = (time) => {
    const formattedTime = time.format('LT', { locale: 'en-US' });
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
  
      const [pickupDetails, serviceInformation, dropDetails, distanceData] = await Promise.all([
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
        calculateDistance(selectedOrigin.coordinates, selectedDestination.coordinates)
          .then(data => data.rows[0].elements[0]),
      ]);
  
      const invoiceData = { contact, pickupDetails, dropDetails, serviceInformation, distanceData };
      await Promise.all([
        postDoc(invoiceData, "invoices"),
        addFrequentAddress({ contact, ...selectedOriginDetails }),
        addFrequentAddress({ contact, ...selectedDestinationDetails }),
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  


  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role)
  }, []);

  if (role === null) {
    return <p>Please log in</p>;
  }

  return (
    <section style={{ width: '100%' }}>
      <Grid style={{ margin: 'auto' }}>
        {/* col1 */}
        <Grid.Col span={4}>
          <h3>Job Information</h3>
          <p>Account <span>Lorem, ipsum dolor.</span> </p>
          <TextField
            name="contact"
            label="Contact"
            variant="outlined"
            value={formData.contact}
            onChange={handleChange}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <h3>Pickup Details</h3>
          <TextField
            name="pickupFrequentAddress"
            select
            label="Frequent Address"
            defaultValue="EUR"
            helperText="Please select your currency"
            variant="outlined"
            value={formData.pickupFrequentAddress}
            onChange={handleChange}
          >
            {frequentAddresses && frequentAddresses.map((option, index) => (
              <MenuItem key={index} value={option.address}>
                {option.address}
              </MenuItem>
            ))}
          </TextField>

          <PlacesAutocomplete onLocationSelect={handleDestination} />

          <TextField
            name="pickupGoodsDescription"
            label="Goods Description"
            multiline
            maxRows={4}
            value={formData.goodsDescription}
            onChange={handleChange}
          />
        </Grid.Col>
      </Grid>
      {/* <Divider/> */}
      <Grid style={{ margin: 'auto' }}>
        <Grid.Col span={4}>
          <h3>Service Information</h3>
          <p></p>
          <TextField
            name="service"
            select
            label="Service"
            defaultValue="EUR"
            helperText="Please select your currency"
            variant="outlined"
            value={formData.service}
            onChange={handleChange}
          >
            {serviceOptions && serviceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

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

          <TextField
            name="pieces"
            label="Pieces"
            multiline
            maxRows={4}
            value={formData.pieces}
            onChange={handleChange}
          />
          <TextField
            name="weight"
            label="Weight (kg)"
            multiline
            maxRows={4}
            value={formData.weight}
            onChange={handleChange}
          />
        </Grid.Col>



        <Grid.Col span={4}>
          <h3>Drop Details</h3>
          <TextField
            name="dropFrequentAddress"
            select
            label="Frequent Address"
            defaultValue="EUR"
            helperText="Please select your currency"
            variant="outlined"
            value={formData.frequentAddress}
            onChange={handleChange}

          >
            {frequentAddresses && frequentAddresses.map((option, index) => (
              <MenuItem key={index} value={option.address}>
                {option.address}
              </MenuItem>
            ))}
          </TextField>

          <PlacesAutocomplete onLocationSelect={handleOrigin} />

          <TextField
            name="dropReference1"
            label="Reference 1"
            multiline
            maxRows={4}
            value={formData.reference1}
            onChange={handleChange}
          />
          <button onClick={submit}>Book Job</button>
        </Grid.Col>

      </Grid >
    </section>
  );
}

