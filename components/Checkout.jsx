"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button } from "@mantine/core";
import { IconButton } from "@mui/material";
import CheckoutSessions from "@/api/CheckoutSessions";
import { postInvoice, updateDoc } from "@/api/firebase/functions/upload";

export default function Checkout({ invoice, handleHide }) {
  const {
    distanceData,
    pickupSuburb,
    dropSuburb,
    service,
    pieces,
    weight,
    selectedOrigin,
    selectedDestination,
    totalPrice,
  } = invoice;

  const handleCheckout = async () => {
    try {
      const docId = await postInvoice(
        { ...invoice, payment: "Not Yet" },
        "place_job"
      );
      const checkoutSession = await CheckoutSessions({ totalPrice, docId });
      const { sessionId, url } = checkoutSession;
      updateDoc("place_job", docId, {
        ...invoice,
        sessionId,
        payment: "Not Yet",
      });
      window.location.href = url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Card
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <CardContent>
        {/* Checkout Details Header */}
        <Typography
          variant="h5"
          gutterBottom
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <ShoppingCartIcon
              style={{
                marginRight: "10px",
                borderRadius: "50%",
                padding: "5px",
                backgroundColor: "#eee",
              }}
            />
            Checkout Details
          </span>
        </Typography>

        {/* Pickup Suburb */}
        <Typography
          variant="body1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <LocationOnIcon />
            </IconButton>
            <strong>Pickup Suburb:</strong>
          </div>{" "}
          {pickupSuburb}
        </Typography>

        {/* Drop Suburb */}
        <Typography
          variant="body1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <WhereToVoteIcon />
            </IconButton>
            <strong>Drop Suburb:</strong>
          </div>{" "}
          {dropSuburb}
        </Typography>

        {/* Service */}
        <Typography
          variant="body1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <LocalShippingIcon />
            </IconButton>
            <strong>Service:</strong>
          </div>{" "}
          {service}
        </Typography>

        {/* Pieces */}
        <Typography
          variant="body1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <InventoryIcon />
            </IconButton>
            <strong>Pieces:</strong>
          </div>{" "}
          {pieces}
        </Typography>

        {/* Weight */}
        <Typography
          variant="body1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <FitnessCenterIcon />
            </IconButton>
            <strong>Weight:</strong>
          </div>{" "}
          {weight}
        </Typography>

        {/* Total Price */}
        <Typography
          variant="body1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <AttachMoneyIcon />
            </IconButton>
            <strong>Total Price:</strong>
          </div>{" "}
          ${totalPrice}
        </Typography>

        {/* Proceed to Checkout Button */}
        <Button
          variant="light"
          color="cyan"
          onClick={handleCheckout}
          style={{ margin: "20px 0", width: "100%" }}
        >
          Proceed to Checkout
        </Button>

        {/* Close Button */}
        <Button
          variant="filled"
          color="red"
          onClick={handleHide}
          style={{ width: "100%" }}
        >
          Close
        </Button>
      </CardContent>
    </Card>
  );
}
