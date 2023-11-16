"use client";
import { postDoc } from "@/api/firebase/functions/upload";
import { Button } from "@mantine/core";
import CheckoutSessions  from "@/api/CheckoutSessions";

export default function Checkout({ invoice, handleHide }) {
  //   postDoc(invoice, "place_job");  // it wil save invoice execute it after payment
  const totalPrice = invoice.totalPrice || "unavaileble";

  const handleCheckout = async () => {
    const checkoutSession = await CheckoutSessions();
    console.log(checkoutSession);
  };

  return (
    <>
      <section>
        <p>{totalPrice}</p>

        <Button variant="filled" color="red" onClick={handleCheckout}>
          Checkout
        </Button>
        <Button variant="filled" color="red" onClick={handleHide}>
          Close
        </Button>
      </section>
    </>
  );
}
