"use client";
import { postDoc } from "@/api/firebase/functions/upload";
import { Button } from "@mantine/core";

export default function Checkout({ invoice, handleHide }) {
  //   postDoc(invoice, "place_job");  // it wil save invoice execute it after payment
  const totalPrice = invoice.totalPrice || "unavaileble";

  return (
    <>
      <section>
        <p>{totalPrice}</p>

        <Button variant="filled" color="red" onClick={handleHide}></Button>
      </section>
    </>
  );
}
