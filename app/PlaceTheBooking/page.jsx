"use client"

import React, { useEffect, useState } from 'react';
import { MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from "@mui/x-date-pickers";
import { postDoc, addFrequentAddress } from '../../api/firebase/functions/upload'
import { fetchFrequentAddresses } from '../../api/firebase/functions/fetch'

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
  const [frequentAddresses, setFrequentAddresses] = useState([])

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
      const addPickFrequentAddress = { contact: contact, address: pickupDetails.pickupAddress, suburb: pickupDetails.pickupSuburb }
      const addDropFrequentAddress = { contact: contact, address: dropDetails.dropAddress, suburb: dropDetails.dropSuburb }
      await postDoc(data, "placed_booking");
      await addFrequentAddress(addPickFrequentAddress)
      await addFrequentAddress(addDropFrequentAddress)
    } catch (error) {
      console.log(error);
    }
  };

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

  const serviceOptions = [
    { value: 'service1', label: 'Service 1' },
    { value: 'service2', label: 'Service 2' },
    { value: 'service3', label: 'Service 3' },
    // Add more options as needed
  ];

  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role)
  }, []);

  if (role === null) {
    return <p>Please log in</p>;
  }
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
          {frequentAddresses.map((option, index) => (
            <MenuItem key={index} value={option.address}>
              {option.address}
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
          {frequentAddresses && frequentAddresses.map((option, index) => (
            <MenuItem key={index} value={option.suburb}>
              {option.suburb}
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
          {serviceOptions && serviceOptions.map((option) => (
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

        >
          {frequentAddresses && frequentAddresses.map((option, index) => (
            <MenuItem key={index} value={option.address}>
              {option.address}
            </MenuItem>
          ))}
        </TextField>
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
          {frequentAddresses && frequentAddresses.map((option, index) => (
            <MenuItem key={index} value={option.suburb}>
              {option.suburb}
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

