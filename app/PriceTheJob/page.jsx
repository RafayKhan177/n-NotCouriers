"use client";
import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { Button } from "@mantine/core";
import { serviceOptions } from "@/components/static";
import { calculatePrice } from "@/api/priceCalculator";
import { calculateDistance } from "@/api/distanceCalculator";
import { PlacesAutocomplete, Checkout, CAP } from "@/components/Index";
import { fetchDocById } from "@/api/firebase/functions/fetch";
import { useRouter } from "next/navigation";

export default function Page() {
  const nav = useRouter();
  const [selectedDestinationDetails, setSelectedDestination] = useState(null);
  const [selectedOriginDetails, setSelectedOrigin] = useState(null);
  const [show, setShow] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [suburbOptions, setSuburbOptions] = useState([]);

  const getSuburbs = async () => {
    try {
      const data = await fetchDocById("options", "data");
      const suburbs = await data.suburb;
      setSuburbOptions(suburbs);
    } catch (error) {
      console.error("Error fetching suburbs:", error);
    }
  };

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
    setSelectedDestination(location);
  };

  const handleOrigin = (location) => {
    setSelectedOrigin(location);
  };

  const handleHide = () => {
    setShow(false);
  };
  const handleSubmit = async () => {
    try {
      const { pickupSuburb, dropSuburb, service, pieces, weight } = formData;

      if (!pickupSuburb || !dropSuburb || !service || !pieces || !weight) {
        alert("Please fill in all required fields");
        return;
      } else {
        try {
          const distance = await calculateDistance(
            selectedOriginDetails.coordinates,
            selectedDestinationDetails.coordinates
          );
          const distanceData = distance.rows[0].elements[0];

          // Add current date and time
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()}/${
            currentDate.getMonth() + 1
          }/${currentDate.getFullYear()}`;
          const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

          const data = {
            distanceData,
            pickupSuburb,
            dropSuburb,
            service,
            pieces,
            weight,
            pickupDetails: selectedOriginDetails,
            dropDetails: selectedDestinationDetails,
            date: formattedDate,
            time: formattedTime,
            progressInformation: [],
          };

          const invoice = await calculatePrice(data);

          setInvoiceData(invoice);
          setShow(true);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const styleField = {
    width: "100%",
    margin: ".8rem 0",
    minWidth: "10rem",
  };

  const [role, setRole] = useState(null);
  useEffect(() => {
    const role =
      (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role);
    getSuburbs();
  }, []);

  if (role === null) {
    return <CAP status={"notLoggedIn"} />;
  } else if (role !== null && role === "user") {
    return <p>Restricted</p>;
  }

  return (
    <>
      {show === true ? (
        <Checkout invoice={invoiceData} handleHide={handleHide} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "25rem",
            margin: "auto",
          }}
        >
          <h1>PRICE A JOB</h1>
          <div style={styleField}>
            <PlacesAutocomplete onLocationSelect={handleOrigin} width={true} />

            <PlacesAutocomplete
              onLocationSelect={handleDestination}
              width={true}
            />
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
            {suburbOptions &&
              suburbOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
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
            {suburbOptions &&
              suburbOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
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

          <Button
            w={180}
            color="red"
            mt={3}
            variant="filled"
            onClick={() => setFormData({})}
          >
            Clear Form
          </Button>
          <Button
            w={180}
            color="red"
            mt={3}
            variant="filled"
            onClick={handleSubmit}
          >
            Price A Job
          </Button>
          <Button
            w={180}
            onClick={() => {
              nav.push("/ClientServices");
            }}
            color="red"
            mt={3}
            variant="filled"
          >
            Client Service
          </Button>
        </div>
      )}
    </>
  );
}
