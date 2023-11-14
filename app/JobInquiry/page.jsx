"use client";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mantine/core";
import { getDocByDateAndId } from "@/api/firebase/functions/fetch";
import { useRouter } from "next/navigation";
import { CAP } from "@/components/Index";

export default function Page() {
  const router = useRouter();
  const initialFormData = {
    date: null,
    orderNo: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleDateChange = (date) => {
    const formattedDate = date ? date.format("MM/DD/YYYY") : null;
    setFormData({ ...formData, date: formattedDate });
  };
  const handleSubmit = async () => {
    const result = await getDocByDateAndId(
      "place_bookings",
      formData.date,
      formData.orderNo
    );
    if (result === null) {
      console.log("No matching document found.");
    } else {
      router.push(`/JobInquiry/${result}`);
    }
  };


  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role)
  }, []);

  if (role === null) {
    return <CAP status={"notLoggedIn"} />;
  } 

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Basic date picker"
          value={formData.date}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <TextField
        name="orderNo"
        label="Job Number"
        multiline
        maxRows={4}
        value={formData.orderNo}
        onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
      />
      <Button variant="filled" color="red" onClick={handleSubmit}>
        RUN QUERY
      </Button>
    </>
  );
}
