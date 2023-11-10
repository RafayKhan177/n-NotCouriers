function calculatePrice(data) {
    console.log(data)
    const perMileRates = {
        Courier: 2,
        HT: 5,
        "1T": 10,
        "2T": 20,
        "4T": 30,
    };

    const weightCategories = {
        Courier: { min: 0, max: 30 },
        HT: { min: 31, max: 500 },
        "1T": { min: 501, max: 1000 },
        "2T": { min: 1001, max: 2000 },
        "4T": { min: 2001, max: Infinity },
    };
    
    const weight = data.serviceInformation?.weight || data.weight;
    const serviceType = data.serviceInformation?.service || data.service;    
    const distanceValue = parseFloat(data.distanceData.distance.text.match(/\d+/)[0]);

    const vehicle = Object.keys(weightCategories).find((category) => {
        const categoryRange = weightCategories[category];
        return weight >= categoryRange.min && weight <= categoryRange.max;
    });

    const basePrice = distanceValue * perMileRates[vehicle];


    let totalPrice;
    if (serviceType === "Express") {
        totalPrice = basePrice * 1.5;
    } else if (serviceType === "Direct") {
        totalPrice = basePrice * 2;
    } else {
        totalPrice = basePrice;
    }

    const requestQuote = weight > 4000;

    // console.log("Total Price:", totalPrice);

    return { ...data, totalPrice, requestQuote };

}

export { calculatePrice };
