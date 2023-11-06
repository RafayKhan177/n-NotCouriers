"use client"

import React, { useState } from 'react';
import { MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers";
<<<<<<< HEAD
import { storeData } from '../../firebase/functions/upload'
=======
import { postDoc } from '../../lib/firebase/functions/upload'
>>>>>>> Development

export default function Page() {
  const initialFormData = {
    contact: "",
    pickupFrequentAddress: "",
    pickupSuburb: "",
    pickupAddress: "",
    pickupGoodsDescription: "",
    service: "",
    date: null,
    time: null,
    pieces: "",
    weight: "",
    dropFrequentAddress: "",
    dropSuburb: "",
    dropAddress: "",
    dropReference1: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    // Format the date as a string in the desired format
    const formattedDate = date.format('MM/DD/YYYY');
    setFormData({ ...formData, date: formattedDate });
  };

  const handleTimeChange = (time) => {
    // Format the time as a string in the desired format
    const formattedTime = time.format('LT', { locale: 'en-US' });
    setFormData({ ...formData, time: formattedTime });
  };

<<<<<<< HEAD
  const submit = async () => {
    await storeData(formData, 'booking')
  }
=======


  const submit = async () => {
    try {
      const {
        contact,
        pickupFrequentAddress,
        pickupSuburb,
        pickupAddress,
        pickupGoodsDescription,
        service,
        date,
        time,
        pieces,
        weight,
        dropFrequentAddress,
        dropSuburb,
        dropAddress,
        dropReference1,
      } = formData;

      const pickupDetails = {
        pickupFrequentAddress,
        pickupSuburb,
        pickupAddress,
        pickupGoodsDescription,
      };

      const serviceInformation = {
        service,
        date,
        time,
        pieces,
        weight,
      };

      const dropDetails = {
        dropFrequentAddress,
        dropSuburb,
        dropAddress,
        dropReference1,
      };

      const data = { contact, pickupDetails, dropDetails, serviceInformation };
      console.log(data)
      await postDoc(data, "placed_booking");
    } catch (error) {
      console.log(error);
    }
  };

>>>>>>> Development

  const frequentAddressOptions = [
    { value: 'address1', label: 'Address 1' },
    { value: 'address2', label: 'Address 2' },
    { value: 'address3', label: 'Address 3' },
    // Add more options as needed
  ];

  const suburbOptions = [
    { value: 'suburbA', label: 'Suburb A' },
    { value: 'suburbB', label: 'Suburb B' },
    { value: 'suburbC', label: 'Suburb C' },
    // Add more options as needed
  ];

  const serviceOptions = [
    { value: 'service1', label: 'Service 1' },
    { value: 'service2', label: 'Service 2' },
    { value: 'service3', label: 'Service 3' },
    // Add more options as needed
  ];

  return (
    <section>
      <div>
        <h3>Job Information</h3>
        <p>Account <span>Lorem, ipsum dolor.</span> </p>
        <TextField
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
          name="pickupFrequentAddress"
          select
          label="Frequent Address"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="outlined"
          value={formData.pickupFrequentAddress}
          onChange={handleChange}
        >
          {frequentAddressOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="pickupSuburb"
          select
          label="Suburb"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="outlined"
          value={formData.suburb}
          onChange={handleChange}
        >
          {suburbOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="pickupAddress"
          label="Address"
          multiline
          maxRows={4}
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          name="pickupGoodsDescription"
          label="Goods Description"
          multiline
          maxRows={4}
          value={formData.goodsDescription}
          onChange={handleChange}
        />
      </div>

      <div>
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
          {serviceOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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
      </div>

      <div>
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

        >{frequentAddressOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}</TextField>
        <TextField
          name="dropSuburb"
          select
          label="Suburb"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="outlined"
          value={formData.suburb}
          onChange={handleChange}
        >
          {suburbOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="dropAddress"
          label="Address"
          multiline
          maxRows={4}
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          name="dropReference1"
          label="Reference 1"
          multiline
          maxRows={4}
          value={formData.reference1}
          onChange={handleChange}
        />
      </div>
      <button onClick={submit}>Book Job</button>
    </section>
  );
}

