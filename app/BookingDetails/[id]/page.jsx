"use client"
import { fetchDocById } from "@/api/firebase/functions/fetch";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const pathname = usePathname();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const match = pathname && pathname.match(/\/([^/]+)$/);
        const id = match && match[1];

        if (id) {
          const data = await fetchDocById(id);
          setInvoice(data);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching invoice:", error);
      }
    };

    fetchInvoice();
  }, [pathname]);

  return (
    <div>
      {invoice ? (
        <h1>{/* Render invoice data here */}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
