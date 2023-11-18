"use client";

import { useEffect, useState } from "react";
import { fetchDocById } from "@/api/firebase/functions/fetch";
import { updateDoc } from "@/api/firebase/functions/upload";
import { Loader } from "@/components/Index";

export default function Page() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const successStatus = async () => {
      try {
        const url = new URL(window.location.href);
        const id = url.pathname.split("/").pop();
        const data = await fetchDocById(id, "place_job");
        await updateDoc("place_job", id, { ...data, payment: "paid" });
        setId(id);
        setLoading(false); // Set loading to false when the data is fetched and updated
        // window.location.href = "/"; // Commented out for testing purposes
      } catch (error) {
        console.error("Dastiyab ya update karne mein koi ghalati:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    successStatus();
  }, []);

  const containerStyle = {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
  };

  const successTextStyle = {
    color: "#28a745",
    fontSize: "18px",
    fontWeight: "bold",
  };

  if (loading) {
    // Display a loading state while fetching and updating data
    return <Loader />;
  }

  return (
    <div style={containerStyle}>
      <p style={successTextStyle}>Your payment was successful!</p>
      <p>
        Thank you for your order. We have received your payment and your order
        is now being processed.
      </p>
      <p>
        Should you have any questions or concerns, please contact our customer
        support.
      </p>
      <p>Thank you for shopping with us!</p>
    </div>
  );
}
