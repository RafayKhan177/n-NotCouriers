"use client";
import React, { useEffect, useState } from "react";
import {
  fetchPlace_job,
  fetchPlace_booking,
} from "../../api/firebase/functions/fetch";
import { RecentInvoices } from "../../components/Index";

export default function Page() {
  const [role, setRole] = useState(null);
  const [place_booking, setPlace_booking] = useState([]);
  const [place_job, setPlace_job] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDoc")) || {};

    const fetchData = async () => {
      const email = user.email;
      const fetchedPlace_booking = await fetchPlace_booking(email);
      setPlace_booking(fetchedPlace_booking);
      const fetchedPlace_job = await fetchPlace_job(email);
      setPlace_job(fetchedPlace_job);
    };

    fetchData();
  }, []);

  return <RecentInvoices place_booking={place_booking} place_job={place_job} />;
}
