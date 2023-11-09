"use client";
import { useEffect, useState } from "react";
import { calculateDistance } from "@/api/distanceCalculator";

export default function Page() {
  const [distance, setDistance] = useState([])
  console.log(distance)
  
  const d = {
    origin: {
      lat: -33.8688197,
      lng: 151.2092955
    },
    destination: {
      lat: -36.9847807,
      lng: 143.3906074
    }
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const distanceData = await calculateDistance(d.origin, d.destination);
        setDistance(distanceData)
      } catch (error) {
        console.error("Error fetching distance:", error);
      }
    };

    fetchDataAndSetData();
  }, []);

  return <main></main>;
}
