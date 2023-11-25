"use client";

import { Typography, Paper } from "@mui/material";
import { Divider, Text } from "@mantine/core";

const renderDetails = (title, details) => (
  <div>
    <br />
    <br />
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
            {(detail && detail.label) || "Not Found"}:
          </h4>
          <h4 tt="uppercase" size="lg" fw={500} style={{ color: "gray" }}>
            {(detail && detail.value) || "Not Found"}
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
          {job == false ? (
            <>
              {renderDetails("Account", [
                { label: "Email", value: invoice.userEmail },
                { label: "Job Number", value: invoice.docId },
              ])}

              {renderDetails("Distance Information", [
                {
                  label: "Duration",
                  value: invoice.distanceData.duration.text,
                },
                {
                  label: "Distance",
                  value: invoice.distanceData.distance.text,
                },
              ])}

              {renderDetails("Service Information", [
                { label: "Service", value: invoice.serviceInformation.service },
                { label: "Weight", value: invoice.serviceInformation.weight },
                {
                  label: "Date Created",
                  value: invoice.serviceInformation.date,
                },
                {
                  label: "Distance",
                  value: invoice.distanceData.distance.text,
                },
                {
                  label: "Time Created",
                  value: invoice.serviceInformation.time,
                },
                { label: "Cost", value: invoice.totalPrice },
              ])}

              {renderDetails("Pickup Details", [
                { label: "Suburb", value: invoice.pickupDetails.pickupSuburb },
                {
                  label: "Address",
                  value: invoice.pickupDetails.selectedOriginDetails.address,
                },
                {
                  label: "Special Instruction",
                  value: invoice.pickupDetails.pickupGoodsDescription,
                },
              ])}

              {renderDetails("Drop Details", [
                { label: "Suburb", value: invoice.dropDetails.dropSuburb },
                {
                  label: "Address",
                  value: invoice.dropDetails.selectedDestinationDetails.address,
                },
                {
                  label: "Drop Reference 1",
                  value: invoice.dropDetails.dropReference1,
                },
              ])}

              {renderDetails("Progress Information", [
                {
                  label: "Booked",
                  value: invoice.progressInformation.booked || "Not Completed",
                },
                {
                  label: "E.T.D.",
                  value: invoice.progressInformation.etd || "Not Completed",
                },
                {
                  label: "Allocated",
                  value:
                    invoice.progressInformation.allocated || "Not Completed",
                },
                {
                  label: "Pick Up",
                  value:
                    invoice.progressInformation.pickedup || "Not Completed",
                },
                {
                  label: "Delivered",
                  value:
                    invoice.progressInformation.delivered || "Not Completed",
                },
                {
                  label: "P.O.D.",
                  value: invoice.progressInformation.pod || "Not Completed",
                },
              ])}
            </>
          ) : (
            <>
              {renderDetails("Account", [
                { label: "Email", value: invoice.userEmail },
                { label: "Job Number", value: invoice.docId },
              ])}

              {renderDetails("Distance Information", [
                {
                  label: "Duration",
                  value: invoice.distanceData.duration.text,
                },
                {
                  label: "Distance",
                  value: invoice.distanceData.distance.text,
                },
              ])}

              {renderDetails("Service Information", [
                { label: "Service", value: invoice.service },
                { label: "Weight", value: invoice.weight },
                { label: "Date Created", value: invoice.date },
                { label: "Time Created", value: invoice.time },
                { label: "Cost", value: invoice.totalPrice },
              ])}

              {renderDetails(
                "Progress Information",
                invoice.progressInformation && [
                  {
                    label: "Booked",
                    value:
                      invoice.progressInformation.booked || "Not Completed",
                  },
                  {
                    label: "E.T.D.",
                    value: invoice.progressInformation.etd || "Not Completed",
                  },
                  {
                    label: "Allocated",
                    value:
                      invoice.progressInformation.allocated || "Not Completed",
                  },
                  {
                    label: "Pick Up",
                    value:
                      invoice.progressInformation.pickedup || "Not Completed",
                  },
                  {
                    label: "Delivered",
                    value:
                      invoice.progressInformation.delivered || "Not Completed",
                  },
                  {
                    label: "P.O.D.",
                    value: invoice.progressInformation.pod || "Not Completed",
                  },
                ]
              )}
            </>
          )}
        </div>
      </Paper>
    </section>
  );
};

export default InvoiceDetails;
