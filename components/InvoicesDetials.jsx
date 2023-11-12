import React from "react";
import { Typography, Paper, Grid } from "@mui/material";

const renderDetails = (title, details) => (
  <div>
    <Typography variant="subtitle1" gutterBottom>
      {title || "some thing went wrong"}
    </Typography>
    {details.map((detail, index) => (
      <Typography key={index} variant="body2">
        {detail.label || "some thing went wrong"}:{" "}
        {detail.value || "some thing went wrong"}
      </Typography>
    ))}
  </div>
);

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
        Invoice Details
      </Typography>

      <div style={{ width: "80%" }}>
        {renderDetails("Account", [
          { label: "Contact", value: contact },
          { label: "Email", value: userEmail },
          { label: "Order", value: docId },
          { label: "Date", value: serviceInformation.date },
          { label: "Time", value: serviceInformation.time },
        ])}

        {renderDetails("Distance Information", [
          { label: "Duration", value: distanceData.duration.text },
          { label: "Distance", value: distanceData.distance.text },
        ])}

        {renderDetails("Service Information", [
          { label: "Service", value: serviceInformation.service },
          { label: "Weight", value: serviceInformation.weight },
          { label: "Cost", value: totalPrice },
        ])}

        {renderDetails("Pickup Details", [
          { label: "Suburb", value: "" }, // Add actual data if needed
          {
            label: "Address",
            value: pickupDetails.selectedOriginDetails.address,
          },
          {
            label: "Special Instruction",
            value: pickupDetails.pickupGoodsDescription,
          },
        ])}

        {renderDetails("Drop Details", [
          { label: "Suburb", value: "" }, // Add actual data if needed
          {
            label: "Address",
            value: dropDetails.selectedDestinationDetails.address,
          },
          { label: "Drop Reference 1", value: dropDetails.dropReference1 },
        ])}
      </div>
    </Paper>
  );
};

export default InvoiceDetails;
