"use client";
import { postDoc } from "@/api/firebase/functions/upload";
import { Button } from "@mantine/core";
import CheckoutSessions from "@/api/CheckoutSessions";

export default function Checkout({ invoice, handleHide }) {
  const totalPrice = invoice.totalPrice || "unavailable";

  const handleCheckout = async () => {
    try {
      const checkoutSession = await CheckoutSessions();
      const { sessionId, url } = checkoutSession;
      await postDoc({ ...invoice, sessionId, payment: "Not Yet" }, "place_job");
      // window.location.href = url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <section>
      <p>{totalPrice}</p>

      <Button variant="filled" color="red" onClick={handleCheckout}>
        Checkout
      </Button>
      <Button variant="filled" color="red" onClick={handleHide}>
        Close
      </Button>
    </section>
  );
}
