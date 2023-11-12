"use client";
import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { Button } from "@mantine/core";
import { fetchFrequentAddresses } from "@/api/firebase/functions/fetch";
import { serviceOptions, suburbOption } from "@/components/static";
import { calculatePrice } from "@/api/priceCalculator";
import { calculateDistance } from "@/api/distanceCalculator";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";

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

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);

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

  const handleDestination = (location) => {
    setSelectedDestination(location.coordinates);
  };

  const handleOrigin = (location) => {
    setSelectedOrigin(location.coordinates);
  };

  const handleSubmit = async () => {
    try {
      const { pickupSuburb, dropSuburb, service, pieces, weight } = formData;
      const distance = await calculateDistance(
        selectedOrigin,
        selectedDestination
      );
      const distanceData = distance.rows[0].elements[0];
      const data = {
        distanceData,
        pickupSuburb,
        dropSuburb,
        service,
        pieces,
        weight,
        selectedOrigin,
        selectedDestination,
      };
      const invoice = await calculatePrice(data);
      console.log(invoice);
    } catch (error) {
      console.error("Error:", error);
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
    width: "100%",
    margin: ".8rem 0",
    minWidth: "10rem",
  };

  return (
    <div className="container" style={{ margin: "0 20%" }}>
      <h1>Price A Job</h1>

      <div style={styleField}>
        <PlacesAutocomplete onLocationSelect={handleOrigin} />
        <br />
        <PlacesAutocomplete onLocationSelect={handleDestination} />
      </div>

      <TextField
        style={styleField}
        name="pickupSuburb"
        select
        label="Pickup Suburb"
        value={formData.pickupSuburb}
        onChange={handleChange}
        helperText="Please select your Suburb"
        variant="outlined"
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
        name="dropSuburb"
        select
        label="Drop Suburb"
        value={formData.dropSuburb}
        onChange={handleChange}
        helperText="Please select your Suburb"
        variant="outlined"
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
            {option.value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={styleField}
        name="pieces"
        id="outlined-multiline-flexible"
        label="Pieces"
        multiline
        maxRows={4}
        value={formData.pieces}
        onChange={handleChange}
      />
      <TextField
        style={styleField}
        name="weight"
        id="outlined-multiline-flexible"
        label="Weight (kg)"
        multiline
        maxRows={4}
        value={formData.weight}
        onChange={handleChange}
      />

      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Button
          size="lg"
          color="red"
          className="btn"
          variant="filled"
          onClick={handleSubmit}
        >
          Price A Job
        </Button>
        <Button
          size="lg"
          color="red"
          className="btn"
          variant="filled"
          onClick={() => setFormData({})}
        >
          Clear
        </Button>
        <Button size="lg" color="red" className="btn" variant="filled">
          Client Service
        </Button>
      </div>
    </div>
  );
}
