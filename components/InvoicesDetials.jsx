import React from "react";
import { Typography, Paper } from "@mui/material";
import { Divider, Text } from "@mantine/core";

const renderDetails = (title, details) => (
  <div>
    <Divider />
    <Text tt="uppercase" size="xl" fw={900} c={"rgba(59, 58, 58, 1)"}>
      {title || "some thing went wrong"}
    </Text>
    {details &&
      details.map((detail, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            tt="uppercase"
            size="lg"
            fw={700}
            variant="gradient"
            gradient={{ from: "red", to: "pink", deg: 120 }}
          >
            {(detail && detail.label) || "something went wrong"}:
          </Text>
          <Text
            tt="uppercase"
            size="lg"
            fw={500}
            c={"gray"}
          >
            {(detail && detail.value) || "something went wrong"}
          </Text>
        </div>
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
  progressInformation,
}) => {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        <Text tt="uppercase" size="xl" fw={900} c={"rgba(59, 58, 58, 1)"}>
          Invoice Details
        </Text>

        <div style={{ width: "80%" }}>
          {renderDetails("Account", [
            { label: "Contact", value: contact },
            { label: "Email", value: userEmail },
            { label: "Order", value: docId },
          ])}

          {renderDetails("Distance Information", [
            { label: "Duration", value: distanceData.duration.text },
            { label: "Distance", value: distanceData.distance.text },
          ])}

          {renderDetails("Service Information", [
            { label: "Service", value: serviceInformation.service },
            { label: "Weight", value: serviceInformation.weight },
            { label: "Date Created", value: serviceInformation.date },
            { label: "Time Created", value: serviceInformation.time },
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

          {renderDetails(
            "Progress Information",
            progressInformation && [
              {
                label: "Booked",
                value: progressInformation.booked || "unaveilable",
              },
              {
                label: "E.T.D.",
                value: progressInformation.etd || "unaveilable",
              },
              {
                label: "Allocated",
                value: progressInformation.allocated || "unaveilable",
              },
              {
                label: "Pick Up",
                value: progressInformation.pickedup || "unaveilable",
              },
              {
                label: "Delivered",
                value: progressInformation.delivered || "unaveilable",
              },
              {
                label: "P.O.D.",
                value: progressInformation.pod || "unaveilable",
              },
            ]
          )}
        </div>
      </Paper>
    </section>
  );
};

export default InvoiceDetails;
