"use client"

import { useState, useEffect } from "react";
import { fetchOptions } from "@/api/firebase/functions/fetch";
import { Button, List, ListItem, Typography, TextField } from "@mui/material";

export default function Page() {
  const [suburbs, setSuburbs] = useState([]);
  const [newSuburb, setNewSuburb] = useState("");

  useEffect(() => {
    const getSuburbs = async () => {
      try {
        const res = await fetchOptions();
        setSuburbs(res.suburb || []);
      } catch (error) {
        console.error("Error fetching suburbs:", error);
      }
    };

    getSuburbs();
  }, []);

  const handleAddSuburb = () => {
    if (newSuburb.trim() !== "") {
      setSuburbs((prevSuburbs) => [...prevSuburbs, newSuburb.trim()]);
      setNewSuburb("");
    }
  };

  const handleRemoveSuburb = (index) => {
    const updatedSuburbs = [...suburbs];
    updatedSuburbs.splice(index, 1);
    setSuburbs(updatedSuburbs);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Suburbs
      </Typography>
      <List style={{ marginTop: 16 }}>
        {suburbs.map((suburb, index) => (
          <ListItem key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography>{suburb}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveSuburb(index)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <div style={{ display: "flex", alignItems: "center", marginTop: 16 }}>
        <TextField
          label="Add Suburb"
          variant="outlined"
          value={newSuburb}
          onChange={(e) => setNewSuburb(e.target.value)}
          style={{ marginRight: 16 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddSuburb}>
          Save
        </Button>
      </div>
    </div>
  );
}
