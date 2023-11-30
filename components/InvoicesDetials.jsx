"use client";

import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { Text } from "@mantine/core";

const renderDetails = (title, details) => (
  <div>
    <br />
    <br />
    <Text tt="uppercase" size="xl" fw={900} c={"rgba(59, 58, 58, 1)"}>
      {title || "something went wrong"}
    </Text>
    {details &&
      details.map(({ label, value }, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 tt="uppercase" size="lg" fw={700} style={{ color: "grey" }}>
            {label || "Not Found"}:
          </h4>
          <h4 tt="uppercase" size="lg" fw={500}>
            {value || "Not Found"}
          </h4>
        </div>
      ))}
  </div>
);

const InvoiceDetails = ({ invoice }) => {
  const serviceInfo = invoice.serviceInformation || invoice;
  const [pickupAddress, setPickupAddress] = useState("Empty");
  const [dropAddress, setDropAddress] = useState("Empty");

  const getAddress = (addressObj) =>
    addressObj && addressObj.address !== "none" ? addressObj.address : null;

  useEffect(() => {
    const pAddress = () => {
      if (invoice && invoice.pickupDetails) {
        const pickupDetails = invoice.pickupDetails;
        const selectedOriginDetails = pickupDetails.selectedOriginDetails;

        return (
          (selectedOriginDetails && getAddress(selectedOriginDetails)) ||
          (pickupDetails.pickupFrequentAddress &&
            pickupDetails.pickupFrequentAddress.address) ||
          pickupDetails.label ||
          "Empty"
        );
      }
      return "Empty";
    };

    const dAddress = () => {
      if (invoice && invoice.dropDetails) {
        const dropDetails = invoice.dropDetails;
        const selectedDestinationDetails =
          dropDetails.selectedDestinationDetails;

        return (
          (selectedDestinationDetails &&
            getAddress(selectedDestinationDetails)) ||
          (dropDetails.dropFrequentAddress &&
            dropDetails.dropFrequentAddress.address) ||
          dropDetails.label ||
          "Empty"
        );
      }

      return "Empty";
    };

    // Set pickup and drop addresses
    try {
      const pickupAddressResult = pAddress();
      setPickupAddress(pickupAddressResult);

      const dropAddressResult = dAddress();
      setDropAddress(dropAddressResult);
    } catch (error) {
      console.error("Error processing invoice:", error);
    }
  }, [invoice]);

  const a = {
    dropDetails: {
      selectedDestinationDetails: {
        address: "Lahore",
      },
      dropFrequentAddress: {
        lat: 123,
        lng: 456,
      },
    },
    pickupDetails: {
      selectedOriginDetails: {
        address: "Islamabad",
      },
      pickupFrequentAddress: {
        lat: 123,
        lng: 456,
      },
    },
    selectedDestination: {
      lat: 123,
      lng: 456,
    },
    selectedOrigin: {
      lat: 123,
      lng: 456,
    },
  };

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
            { label: "Account", value: invoice.userName },
            { label: "Email", value: invoice.userEmail },
            { label: "Job Number", value: invoice.docId },
          ])}

          {renderDetails("Service Information", [
            {
              label: "Service",
              value: (serviceInfo && serviceInfo.service) || "null",
            },
            {
              label: "Weight",
              value: (serviceInfo && serviceInfo.weight) || "null",
            },
            {
              label: "Date Created",
              value: (serviceInfo && serviceInfo.date) || "null",
            },
            { label: "Time Created", value: serviceInfo.time },
            { label: "Cost", value: invoice.totalPrice },
          ])}

          {renderDetails("Pickup Details", [
            {
              label: "Suburb",
              value:
                (invoice.pickupDetails && invoice.pickupDetails.pickupSuburb) ||
                invoice.pickupSuburb ||
                "null",
            },
            {
              label: "Address",
              value: pickupAddress,
            },
            {
              label: "Special Instruction",
              value:
                (invoice.pickupDetails &&
                  invoice.pickupDetails.pickupGoodsDescription) ||
                "Empty",
            },
          ])}

          {renderDetails("Drop Details", [
            {
              label: "Suburb",
              value:
                (invoice.dropDetails && invoice.dropDetails.dropSuburb) ||
                invoice.dropSuburb ||
                "null",
            },
            {
              label: "Address",
              value: dropAddress,
            },
            {
              label: "Drop Reference 1",
              value:
                (invoice.dropDetails && invoice.dropDetails.dropReference1) ||
                "Empty",
            },
          ])}

          {renderDetails("Progress Information", [
            {
              label: "Booked",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.booked) ||
                "Pending",
            },
            {
              label: "E.T.D.",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.etd) ||
                "Pending",
            },
            {
              label: "Allocated",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.allocated) ||
                "Pending",
            },
            {
              label: "Pick Up",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.pickedup) ||
                "Pending",
            },
            {
              label: "Delivered",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.delivered) ||
                "Pending",
            },
            {
              label: "P.O.D.",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.pod) ||
                "Pending",
            },
          ])}
        </div>
      </Paper>
    </section>
  );
};

export default InvoiceDetails;
