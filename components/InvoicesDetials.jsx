import React from "react";
import { Typography, Paper, Grid } from "@mui/material";

const InvoiceDetails = ({
  distanceData,
  requestQuote,
  contact,
  totalPrice,
  userEmail,
  pickupDetails,
  docId,
  dropDetails,
  serviceInformation,
}) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: 20,
        margin: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "70%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Service Details
      </Typography>

      <div style={{ width: "80%" }}>
        {/* Display distance data */}
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Distance Data
          </Typography>
          <Typography variant="body2">Status: {distanceData.status}</Typography>
          <Typography variant="body2">
            Duration: {distanceData.duration.text}
          </Typography>
          <Typography variant="body2">
            Distance: {distanceData.distance.text}
          </Typography>
        </div>

        {/* Display service information */}
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Service Information
          </Typography>
          <Typography variant="body2">
            Service: {serviceInformation.service}
          </Typography>
          <Typography variant="body2">
            Date: {serviceInformation.date}
          </Typography>
          <Typography variant="body2">
            Weight: {serviceInformation.weight}
          </Typography>
          <Typography variant="body2">
            Pieces: {serviceInformation.pieces}
          </Typography>
          <Typography variant="body2">
            Time: {serviceInformation.time}
          </Typography>
        </div>

        {/* Display drop details */}
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Drop Details
          </Typography>
          <Typography variant="body2">
            Drop Reference 1: {dropDetails.dropReference1}
          </Typography>
          <Typography variant="body2">
            Selected Destination:{" "}
            {dropDetails.selectedDestinationDetails.address}
          </Typography>
          {/* Add more details as needed */}
        </div>

        {/* Display pickup details */}
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Pickup Details
          </Typography>
          <Typography variant="body2">
            Pickup Goods Description: {pickupDetails.pickupGoodsDescription}
          </Typography>
          <Typography variant="body2">
            Pickup Address: {pickupDetails.selectedOriginDetails.address}
          </Typography>
          {/* Add more details as needed */}
        </div>

        <Typography variant="body1">Total Price: {totalPrice}</Typography>
      </div>
    </Paper>
  );
};

export default InvoiceDetails;
