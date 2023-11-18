"use client";

import { useEffect } from "react";
import { fetchDocById } from "@/api/firebase/functions/fetch";
import { updateDoc } from "@/api/firebase/functions/upload";

export default function Page() {
  useEffect(() => {
    const successStatus = async () => {
      try {
        const url = new URL(window.location.href);
        const id = url.pathname.split("/").pop();
        const data = await fetchDocById(id, "place_job");
        await updateDoc("place_job", id, { ...data, payment: "paid" });
        window.location.href = "/";
      } catch (error) {
        console.error("Dastiyab ya update karne mein koi ghalati:", error);
      }
    };

    successStatus();
  }, []);

  return (
    <div>
      <p>working</p>
    </div>
  );
}
