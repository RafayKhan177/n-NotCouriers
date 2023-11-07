"use client"
import React, { useEffect, useState } from "react";
import { fetchRecentInvoices } from "../../api/firebase/functions/fetch";
import { RecentInvoices } from "../../components/Index"

export default function Page() {
  const [role, setRole] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userDoc = JSON.parse(localStorage.getItem("userDoc")) || {};
      const userRole = userDoc.role || null;
      setRole(userRole);

      if (userRole) {
        const userEmail = userDoc.email;
        const fetchedInvoices = await fetchRecentInvoices(userEmail);
        setInvoices(fetchedInvoices);
      }
    };

    fetchData();
  }, []);

  if (role === null) {
    return <p>Please log in</p>;
  }

  return (<RecentInvoices invoices={invoices} />);
}
