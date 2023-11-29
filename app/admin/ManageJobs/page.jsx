"use client";
import { MenageInvoices, Stats } from "@/components/Index";
import { useEffect, useState } from "react";
import { getPaidDocumentsFromCollection } from "@/api/firebase/functions/fetch";

export default function Page() {
  const [place_job, setPlace_job] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlace_job = await getPaidDocumentsFromCollection(
          "place_job"
        );
        setPlace_job(fetchedPlace_job);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Stats />
      <MenageInvoices invoice={place_job} title={"Job"} />;
    </>
  );
}
