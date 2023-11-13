"use client";
import { MenageInvoices } from "@/components/Index";
import { useEffect, useState } from "react";
import { getCollection } from "@/api/firebase/functions/fetch";

export default function Page() {
  const [invoices, setInvoices] = useState(null);
  console.log(invoices);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedInvoices = await getCollection("place_bookings");
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  return <MenageInvoices invoices={invoices} />;
}
