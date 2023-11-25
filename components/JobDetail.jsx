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
          <h4 tt="uppercase" size="lg" fw={700} style={{ color: "grey" }}>
            {(detail && detail.label) || "something went wrong"}:
          </h4>
          <h4 tt="uppercase" size="lg" fw={500} style={{ color: "gray" }}>
            {(detail && detail.value) || "something went wrong"}
          </h4>
        </div>
      ))}
  </div>
);

const InvoiceDetails = (invoice, job) => {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "40rem",
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
          <>
            {renderDetails("Account", [
              { label: "Email", value: invoice.userEmail },
              { label: "Account", value: "PSS DISTRIBUTORS" },
              { label: "Job Number", value: invoice.docId },
            ])}

            {/* {renderDetails("Distance Information", [
                {
                  label: "Duration",
                  value: invoice.distanceData.duration.text,
                },
                {
                  label: "Distance",
                  value: invoice.distanceData.distance.text,
                },
              ])} */}

            {renderDetails("Service Information", [
              { label: "Service", value: invoice.service },
              { label: "Piece", value: invoice.pieces },
              { label: "Weight", value: invoice.weight },
              { label: "Cost", value: invoice.totalPrice },
              { label: "Date Created", value: invoice.date },
              // { label: "Time Created", value: invoice.time },
            ])}

            {renderDetails(
              "Progress Information",
              invoice.progressInformation && [
                {
                  label: "Booked",
                  value: invoice.progressInformation.booked || "Not Yet",
                },
                {
                  label: "E.T.D.",
                  value: invoice.progressInformation.etd || "Not Yet",
                },
                {
                  label: "Allocated",
                  value: invoice.progressInformation.allocated || "Not Yet",
                },
                {
                  label: "Pick Up",
                  value: invoice.progressInformation.pickedup || "Not Yet",
                },
                {
                  label: "Delivered",
                  value: invoice.progressInformation.delivered || "Not Yet",
                },
                {
                  label: "P.O.D.",
                  value: invoice.progressInformation.pod || "Not Yet",
                },
              ]
            )}
            {renderDetails("Pickup Details", [
              { label: "Suburb", value: invoice.pickupSuburb },
              // {
              //   label: "Address",
              //   value: invoice.pickupDetails.selectedOriginDetails.address,
              // },
              {
                label: "Delivered",
                value: invoice.progressInformation.delivered || "Not Yet",
              },
            ])}

            {renderDetails("Drop Details", [
              { label: "Suburb", value: invoice.dropSuburb },
              // {
              //   label: "Address",
              //   value: invoice.dropDetails.selectedDestinationDetails.address,
              // },
              {
                label: "Delivered",
                value: invoice.progressInformation.delivered || "Not Yet",
              },
            ])}
          </>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetails;
