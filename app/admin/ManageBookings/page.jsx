"use client";
import { MenageInvoices, Stats } from "@/components/Index";
import { useEffect, useState } from "react";
import { getCollection } from "@/api/firebase/functions/fetch";

export default function Page() {
  const [place_booking, setPlace_booking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlace_booking = await getCollection("place_bookings");
        setPlace_booking(fetchedPlace_booking);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Stats />
      <MenageInvoices invoice={place_booking} title={"Jobs"} />;
    </>
  );
}
