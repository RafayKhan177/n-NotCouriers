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
          <Text tt="uppercase" size="lg" fw={500} c={"gray"}>
            {(detail && detail.value) || "something went wrong"}
          </Text>
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
          {job === false ? (
            <>
              {renderDetails("Account", [
                { label: "Contact", value: invoice.contact },
                { label: "Email", value: invoice.userEmail },
                { label: "Order", value: invoice.docId },
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

              {renderDetails(
                "Progress Information",
                invoice.progressInformation && [
                  {
                    label: "Booked",
                    value: invoice.progressInformation.booked || "unaveilable",
                  },
                  {
                    label: "E.T.D.",
                    value: invoice.progressInformation.etd || "unaveilable",
                  },
                  {
                    label: "Allocated",
                    value:
                      invoice.progressInformation.allocated || "unaveilable",
                  },
                  {
                    label: "Pick Up",
                    value:
                      invoice.progressInformation.pickedup || "unaveilable",
                  },
                  {
                    label: "Delivered",
                    value:
                      invoice.progressInformation.delivered || "unaveilable",
                  },
                  {
                    label: "P.O.D.",
                    value: invoice.progressInformation.pod || "unaveilable",
                  },
                ]
              )}
            </>
          ) : (
            <>
              {renderDetails("Account", [
                { label: "Email", value: invoice.userEmail },
                { label: "Order", value: invoice.docId },
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
                    value: invoice.progressInformation.booked || "unaveilable",
                  },
                  {
                    label: "E.T.D.",
                    value: invoice.progressInformation.etd || "unaveilable",
                  },
                  {
                    label: "Allocated",
                    value:
                      invoice.progressInformation.allocated || "unaveilable",
                  },
                  {
                    label: "Pick Up",
                    value:
                      invoice.progressInformation.pickedup || "unaveilable",
                  },
                  {
                    label: "Delivered",
                    value:
                      invoice.progressInformation.delivered || "unaveilable",
                  },
                  {
                    label: "P.O.D.",
                    value: invoice.progressInformation.pod || "unaveilable",
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
