"use client";

import React, { useState, useEffect } from "react";
import { fetchOptions } from "@/api/firebase/functions/fetch";
import { updateDoc } from "@/api/firebase/functions/upload";
import { List, ListItem, Typography, TextField } from "@mui/material";
import { Button } from "@mantine/core";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Services Price</h1>
      <List>
        {Object.entries(rates).map(([key, value]) => (
          <ListItem key={key}>
            <Typography width={80} variant="body1" sx={{ minWidth: 120 }}>
              {key}
            </Typography>
            <TextField
              type="number"
              value={value}
              onChange={(e) => handleRateChange(key, e.target.value)}
              sx={{ ml: 2, width: 100 }}
              minWidth={200}
              InputProps={{
                startAdornment: (
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    $
                  </Typography>
                ),
              }}
            />
          </ListItem>
        ))}
      </List>
      <Button variant="light" color="red" size="lg" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
