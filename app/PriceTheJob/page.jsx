"use client";
import { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";

export default function Page() {
  const [formData, setFormData] = useState({
    pickupSuburb: "",
    dropSuburb: "",
    service: "",
    pieces: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  const pickupSuburbOptions = [
    { value: "suburb1", label: "Suburb 1" },
    { value: "suburb2", label: "Suburb 2" },
    // Add more options as needed
  ];

  const dropSuburbOptions = [
    { value: "suburbA", label: "Suburb A" },
    { value: "suburbB", label: "Suburb B" },
    // Add more options as needed
  ];

  const serviceOptions = [
    { value: "service1", label: "Service 1" },
    { value: "service2", label: "Service 2" },
    // Add more options as needed
  ];

  return (
    <div className="container">
      <h1>Price A Job</h1>
      <p>
        Account: <span>frfrfr</span>
      </p>
      <TextField
        name="pickupSuburb"
        select
        label="Pickup Suburb"
        value={formData.pickupSuburb}
        onChange={handleChange}
        helperText="Please select your Suburb"
        variant="outlined"
      >
        {pickupSuburbOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="dropSuburb"
        select
        label="Drop Suburb"
        value={formData.dropSuburb}
        onChange={handleChange}
        helperText="Please select your Suburb"
        variant="outlined"
      >
        {dropSuburbOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="service"
        select
        label="Service"
        value={formData.service}
        onChange={handleChange}
        helperText="Please select your service"
        variant="outlined"
      >
        {serviceOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="pieces"
        id="outlined-multiline-flexible"
        label="Pieces"
        multiline
        maxRows={4}
        value={formData.pieces}
        onChange={handleChange}
      />
      <TextField
        name="weight"
        id="outlined-multiline-flexible"
        label="Weight (kg)"
        multiline
        maxRows={4}
        value={formData.weight}
        onChange={handleChange}
      />

      <div>
        <Button className="btn" variant="contained" onClick={handleSubmit}>
          Price A Job
        </Button>
        <Button
          className="btn"
          variant="contained"
          onClick={() => setFormData({})}
        >
          Clear
        </Button>
        <Button className="btn" variant="contained">
          Client Service
        </Button>
      </div>
    </div>
  );
}
