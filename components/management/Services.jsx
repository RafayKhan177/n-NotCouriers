"use client";

import React, { useState, useEffect } from "react";
import { fetchOptions } from "@/api/firebase/functions/fetch";
import { updateDoc } from "@/api/firebase/functions/upload";
import { List, ListItem, Typography, TextField, Button } from "@mui/material";

export default function PerKmRates() {
  const [rates, setRates] = useState({});

  useEffect(() => {
    const getSuburbs = async () => {
      try {
        // Assuming fetchOptions returns something related to suburbs
        const res = await fetchOptions();
        setRates(res.perKmRates);
      } catch (error) {
        console.error("Error fetching suburbs:", error);
      }
    };

    getSuburbs();
  }, []);

  const handleRateChange = (key, value) => {
    setRates((prevRates) => ({
      ...prevRates,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      updateDoc("data", "options", { perKmRates: rates });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <List>
        {Object.entries(rates).map(([key, value]) => (
          <ListItem key={key}>
            <Typography variant="body1">{key}</Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => handleRateChange(key, e.target.value)}
            />
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
