"use client"

import React, { useState } from 'react';
import { MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers";

export default function Page() {
  const [formData, setFormData] = useState({
    contact: '',
    frequentAddress: '',
    suburb: '',
    address: '',
    goodsDescription: '',
    service: '',
    date: null, // To be updated with date picker value
    time: null, // To be updated with time picker value
    pieces: '',
    weight: '',
    reference1: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

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
          variant="standard"
          value={formData.contact}
          onChange={handleChange}
        />
      </div>

      <div>
        <h3>Pickup Details</h3>
        <TextField
          name="frequentAddress"
          select
          label="Frequent Address"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="standard"
          value={formData.frequentAddress}
          onChange={handleChange}
        >
          {frequentAddressOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="suburb"
          select
          label="Suburb"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="standard"
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
          name="address"
          label="Address"
          multiline
          maxRows={4}
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          name="goodsDescription"
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
          variant="standard"
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
          name="frequentAddress"
          select
          label="Frequent Address"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="standard"
          value={formData.frequentAddress}
          onChange={handleChange}

        >{frequentAddressOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}</TextField>
        <TextField
          name="suburb"
          select
          label="Suburb"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="standard"
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
          name="address"
          label="Address"
          multiline
          maxRows={4}
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          name="reference1"
          label="Reference 1"
          multiline
          maxRows={4}
          value={formData.reference1}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}

