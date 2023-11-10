function calculatePrice(data) {
    // Define per kilometer rates for different vehicle types (adjust as needed)
    const rates = {
        Courier: 1,
        HT: 2,
        '1T': 3,
        '2T': 4,
        '4T': 5
    };

    // Extract necessary information from the provided data
    const { service, weight, distanceData } = data.serviceInformation;
    const { value: distanceValue } = distanceData.distance;

    // Determine the vehicle type based on weight
    let vehicleType;
    if (weight < 30) {
        vehicleType = 'Courier';
    } else if (weight <= 500) {
        vehicleType = 'HT';
    } else if (weight <= 1000) {
        vehicleType = '1T';
    } else if (weight <= 2000) {
        vehicleType = '2T';
    } else {
        vehicleType = '4T';
    }

    // Get the per kilometer rate for the selected vehicle type
    const perKmRate = rates[vehicleType];

    // Calculate the base cost
    const baseCost = distanceValue * perKmRate;

    // Adjust the total price based on the selected service type
    let totalPrice;
    switch (service) {
        case 'Express':
            totalPrice = baseCost * 1.5;
            break;
        case 'Direct':
            totalPrice = baseCost * 2;
            break;
        default:
            totalPrice = baseCost;
    }

    // Display or use the totalPrice as needed
    console.log(`Total Price: $${totalPrice.toFixed(2)}`);
    return totalPrice;
}

// Example usage with the provided data
const testData = {
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
        "weight": "34"
    },
    "distanceData": {
        "distance": {
            "text": "583 mi",
            "value": 937964
        },
        "duration": {
            "text": "9 hours 49 mins",
            "value": 35360
        },
        "status": "OK"
    }
}
calculatePrice(testData);
