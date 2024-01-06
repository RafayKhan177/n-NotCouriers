"use client";
import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
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
    LxWxH: ""
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
      const { service, pieces, weight, LxWxH } = formData;

      if (!service || !pieces || !weight || !LxWxH) {
        alert("Please fill in all required fields");
        return;
      }

      const { coordinates: originCoordinates } = selectedOriginDetails;
      const { coordinates: destinationCoordinates } = selectedDestinationDetails;

      if (!originCoordinates || !destinationCoordinates) {
        alert("Invalid coordinates for pickup or drop location");
        return;
      }

      try {
        const distance = await calculateDistance(originCoordinates, destinationCoordinates);

        if (!distance?.rows?.[0]?.elements?.[0]) {
          console.error("Invalid distance data");
          return;
        }

        // Add current date and time
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

        const data = {
          distanceData: distance.rows[0].elements[0],
          service,
          pieces,
          weight,
          LxWxH,
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
        console.error("Error calculating price:", error);
      }
    } catch (error) {
      console.error("Error in form data:", error);
    }
  };


  const styleField = {
    width: "100%",
    margin: ".8rem 0",
    minWidth: "10rem",
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("userDoc")) || {} || null;
    setUser(role);
    getSuburbs();
  }, []);

  if (user && user.role === null) {
    return <CAP status={"notLoggedIn"} />;
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
            size="small"
            label="Level of Service"
            helperText="Please select any level of service"

            style={styleField}
            name="service"
            select
            value={formData.service}
            onChange={handleChange}
            variant="outlined"
          >
            {serviceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"

            style={styleField}
            name="pieces"
            id="outlined-multiline-flexible"
            label="No. of Items"
            helperText="Enter the number of items"

            multiline
            maxRows={4}
            value={formData.pieces}
            onChange={handleChange}
          />
          <TextField
            size="small"

            style={styleField}
            name="weight"
            id="outlined-multiline-flexible"
            label="Weight (kg)"
            helperText="Enter the weight in (KG)"
            multiline
            maxRows={4}
            value={formData.weight}
            onChange={handleChange}
          />
          <TextField

            style={styleField}
name="LxWxH"
            label="LxWxH"
            size="small"
            helperText="Enter the Length Width Height in (CM)"

            value={formData.LxWxH}
            onChange={handleChange}
          />
          <Button
            w={180}
            color="#F14902"
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
            color="#F14902"
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
