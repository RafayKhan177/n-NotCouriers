"use client";

import { useState, useEffect } from "react";
import { fetchOptions } from "@/api/firebase/functions/fetch";
import { List, ListItem, Typography, TextField } from "@mui/material";
import { updateDoc } from "@/api/firebase/functions/upload";
import { Button } from "@mantine/core";

export default function Suburbs() {
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
      const updatedSuburbs = [...suburbs, newSuburb.trim()];
      setSuburbs(updatedSuburbs);
      saveInDb(updatedSuburbs);
      setNewSuburb("");
    }
  };

  const handleRemoveSuburb = (index) => {
    const updatedSuburbs = [...suburbs];
    updatedSuburbs.splice(index, 1);
    setSuburbs(updatedSuburbs);
    saveInDb(updatedSuburbs);
  };

  const saveInDb = (updatedSuburbs) => {
    updateDoc("data", "options", { suburb: updatedSuburbs });
    console.log("data", "options", { suburb: updatedSuburbs });
  };

  return (
    <>
      <div
        style={{
          maxWidth: 600,
          margin: "auto",
          padding: 16,
          textAlign: "center",
        }}
      >
        <h1>Suburbs</h1>
        <List style={{ marginTop: 16 }}>
          {suburbs.map((suburb, index) => (
            <ListItem
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{suburb}</Typography>
              <Button
                variant="filled"
                color="red"
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
          <Button
            variant="light"
            color="red"
            size="lg"
            onClick={handleAddSuburb}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
