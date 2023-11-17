"use client"

import { deleteDocument } from "@/api/firebase/functions/upload";
import React from "react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const successStatus = async () => {
      try {
        const url = new URL(window.location.href);
        const id = url.pathname.split("/").pop();
        await deleteDocument("place_job", id);
      } catch (error) {
        console.error("Dastiyab ya update karne mein koi ghalati:", error);
      }
    };

    successStatus();
  }, []);
  return <div>page</div>;
}
