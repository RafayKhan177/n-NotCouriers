import { fetchOptions } from "./firebase/functions/fetch";

async function calculatePrice(data) {
  const res = await fetchOptions();
  const perKmRates = await res.perKmRates;

  const weightCategories = {
    Courier: { min: 0, max: 30 },
    HT: { min: 31, max: 500 },
    "1T": { min: 501, max: 1000 },
    "2T": { min: 1001, max: 2000 },
    "4T": { min: 2001, max: Infinity },
  };

  const weight = data.serviceInformation?.weight || data.weight;
  const serviceType = data.serviceInformation?.service || data.service;
  const distanceValueMiles = parseFloat(
    data.distanceData.distance.text.match(/\d+/)[0]
  );

  // Convert miles to kilometers (1 mile is approximately 1.60934 kilometers)
  const distanceValueKm = distanceValueMiles * 1.60934;

  const vehicle = Object.keys(weightCategories).find((category) => {
    const categoryRange = weightCategories[category];
    return weight >= categoryRange.min && weight <= categoryRange.max;
  });

  const basePrice = distanceValueKm * perKmRates[vehicle];

  let totalPrice;
  if (serviceType === "Express") {
    totalPrice = basePrice * 1.5;
  } else if (serviceType === "Direct") {
    totalPrice = basePrice * 2;
  } else {
    totalPrice = basePrice;
  }

  const requestQuote = weight > 4000;

  // Round the totalPrice to the nearest whole number
  totalPrice = Math.round(totalPrice);

  return { ...data, totalPrice, requestQuote };
}

export { calculatePrice };
