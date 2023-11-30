"use client";
import { calculateDistance } from "@/api/distanceCalculator";
import { calculatePrice } from "@/api/priceCalculator";
import {
  addFrequentAddress,
  postInvoice,
} from "@/api/firebase/functions/upload";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function BookCheckout({
  formData,
  selectedDestination,
  selectedOrigin,
}) {
  const nav = useRouter();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(invoice);

  useEffect(() => {
    const fetchData = async () => {
      await handleData();
    };
    fetchData();
  }, []);

  // -----------------------------Submit
  const {
    contact,
    pickupFrequentAddress,
    pickupGoodsDescription,
    service,
    date,
    time,
    pieces,
    weight,
    dropFrequentAddress,
    dropReference1,
    dropSuburb,
    pickupSuburb,
  } = formData;

  const handleData = async () => {
    try {
      const selectedOriginDetails = {
        address: selectedOrigin?.label || "none",
        coordinates: selectedOrigin?.coordinates || "none",
      };

      const selectedDestinationDetails = {
        address: selectedDestination?.label || "none",
        coordinates: selectedDestination?.coordinates || "none",
      };

      const pickupDetails = {
        pickupFrequentAddress,
        selectedOriginDetails,
        pickupGoodsDescription,
        pickupSuburb,
      };

      const serviceInformation = {
        service,
        date,
        time,
        pieces,
        weight,
      };

      const dropDetails = {
        dropFrequentAddress,
        selectedDestinationDetails,
        dropSuburb,
        dropReference1,
      };

      let distanceData;
      try {
        distanceData = await calculateDistance(
          pickupFrequentAddress.coordinates || selectedOrigin.coordinates,
          dropFrequentAddress.coordinates || selectedDestination.coordinates
        ).then((data) => data.rows[0].elements[0]);
      } catch (distanceError) {
        console.error("Error calculating distance:", distanceError);
        return;
      }

      const data = {
        contact,
        pickupDetails,
        dropDetails,
        serviceInformation,
        distanceData,
      };

      const invoiceData = await calculatePrice(data);
      setInvoice(invoiceData);
      setLoading(true);
    } catch (error) {
      console.error("Error while submit:", error);
    }
  };

  const handleSubmit = async () => {
    if (invoice) {
      await Promise.all([
        postInvoice(invoice, "place_bookings"),
        addFrequentAddress(invoice?.pickupDetails?.selectedOriginDetails),
        addFrequentAddress(invoice?.dropDetails?.selectedDestinationDetails),
      ]);
      nav.push("/ClientServices");
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
      {loading ? (
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
              <strong>Pickup Address:</strong>
            </div>{" "}
            {invoice?.pickupDetails?.pickupFrequentAddress?.address ||
              invoice?.pickupDetails?.selectedOriginDetails?.address ||
              "Loading"}
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
              <strong>Drop Address:</strong>
            </div>{" "}
            {invoice?.dropDetails?.dropFrequentAddress?.address ||
              invoice?.dropDetails?.selectedDestinationDetails?.address ||
              "Loading"}
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
            {invoice?.serviceInformation?.service || "Loading"}
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
            {invoice?.serviceInformation?.pieces || "Loading"}
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
            {invoice?.serviceInformation?.weight || "Loading"}
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
            {invoice?.totalPrice || "Loading"}{" "}
            {/* Add the correct property for total price */}
          </Typography>

          {/* Proceed to Checkout Button */}
          <Button
            variant="light"
            color="cyan"
            onClick={handleSubmit}
            style={{ margin: "20px 0", width: "100%" }}
          >
            Proceed to Checkout
          </Button>
        </CardContent>
      ) : (
        <Loading />
      )}
    </Card>
  );
}
