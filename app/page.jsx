"use client";
import React from "react";

export default function Page() {
  const data = {
    "contact": "Rafay",
    "pickupDetails": {
      "pickupFrequentAddress": "",
      "selectedOriginDetails": {
        "address": "347 Kent Street, Sydney NSW, Australia",
        "coordinates": {
          "lat": -33.8685686,
          "lng": 151.2041883
        }
      },
      "pickupGoodsDescription": "test"
    },
    "dropDetails": {
      "dropFrequentAddress": "",
      "selectedDestinationDetails": {
        "address": "12 Apostles, Victoria, Australia",
        "coordinates": {
          "lat": -38.6645738,
          "lng": 143.1029791
        }
      },
      "dropReference1": "test"
    },
    "serviceInformation": {
      "service": "Express",
      "date": "11/24/2023",
      "time": "12:20 AM",
      "pieces": "3",
      "weight": 500
    },
    "distanceData": {
      "distance": {
        "text": "5 mi",
        "value": 937964
      },
      "duration": {
        "text": "9 hours 49 mins",
        "value": 35360
      },
      "status": "OK"
    }
  }
  function calculatePrice() {
    // Constants for per mile rates for different vehicles (numeric values from admin)
    const perMileRates = {
      Courier: 2,
      HT: 5,
      '1T': 10,
      '2T': 20,
      '4T': 30
    };

    // Weight categories for different vehicles
    const weightCategories = {
      Courier: 30,
      HT: 500,
      '1T': 1000,
      '2T': 2000,
      '4T': Infinity
    };

    // Extracting data from the input
    const { service, weight } = data.serviceInformation;
    const distanceValue = parseFloat(data.distanceData.distance.text.replace(/\D/g, '')); // Using the text property instead of value
    console.log(distanceValue)

    // Determine the vehicle based on weight
    const vehicle = Object.keys(weightCategories).find(category => weight <= weightCategories[category]);

    // Calculate base price
    const basePrice = distanceValue * perMileRates[vehicle];

    // Adjust price based on service type
    const multiplier = {
      Standard: 1,
      Express: 1.5,
      Direct: 2
    }[service];

    // Calculate the total price
    const totalPrice = basePrice * multiplier;

    // If weight is more than 4000 kg, show "Request Quote" button
    const requestQuote = weight > 4000;

    // Log the calculated price and whether to show the "Request Quote" button
    console.log(totalPrice, requestQuote);
  }


  return (
    <div>
      <p>d</p>
      <p>d</p>
      <p>d</p>
      <button onClick={calculatePrice}>Calculate Price</button>
    </div>
  );
}
