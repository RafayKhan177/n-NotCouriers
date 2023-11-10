"use client";
import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { Button } from "@mantine/core";
import { fetchFrequentAddresses } from "@/api/firebase/functions/fetch";
import { serviceOptions } from "@/components/static";
import { calculatePrice } from "@/api/priceCalculator";
import { calculateDistance } from "@/api/distanceCalculator";

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

  const [frequentAddresses, setFrequentAddresses] = useState([])
  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropAddress: "",
    service: "",
    pieces: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {

      const { dropAddress, pickupAddress, pieces, service, weight } = formData
      const distance = await calculateDistance(formData.pickupAddress.coordinates, formData.dropAddress.coordinates);
      const distanceData = distance.rows[0].elements[0]
      const data = { distanceData, dropAddress, pickupAddress, pieces, service, weight };
      const invoice = await calculatePrice(data);
      alert(invoice.totalPrice);
    } catch (error) {
      console.error("Error:", error);
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

  const styleField = {
    width: '100%',
    margin: '.8rem 0',
    minWidth: '10rem'
  }

  return (
    <div className="container" style={{ margin: '0 20%' }}>
      <h1>Price A Job</h1>
      <p>
        Account: <span>frfrfr</span>
      </p>
      <TextField
        style={styleField}
        name="pickupAddress"
        select
        label="Pickup Suburb"
        value={formData.pickupAddress}
        onChange={handleChange}
        helperText="Please select your Suburb"
        variant="outlined"
      >
        {frequentAddresses && frequentAddresses.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option.address}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        style={styleField}
        name="dropAddress"
        select
        label="Drop Suburb"
        value={formData.dropAddress}
        onChange={handleChange}
        helperText="Please select your Suburb"
        variant="outlined"
      >
        {frequentAddresses && frequentAddresses.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option.address}
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

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Button size="lg" color="red" className="btn" variant="filled" onClick={handleSubmit}>
          Price A Job
        </Button>
        <Button size="lg" color="red"
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
