const API_KEY = "AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y";

const dummy = {
    "destination_addresses": [
        "151 Martins Ln, Tanwood VIC 3478, Australia"
    ],
    "origin_addresses": [
        "110-140 King St, Sydney NSW 2000, Australia"
    ],
    "rows": [
        {
            "elements": [
                {
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
            ]
        }
    ],
    "status": "OK"
}

async function calculateDistance(origin, destination) {
    try {
        // const originStr = `${origin.lat},${origin.lng}`;
        // const destinationStr = `${destination.lat},${destination.lng}`;

        // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originStr}&destinations=${destinationStr}&key=${API_KEY}`;
        // const res = await fetch(url);

        // if (!res.ok) {
        //     // throw new Error("Failed to fetch data");
        //     return url
        // }

        // const data = await res.json();
        // return data;
        return dummy

    } catch (error) {
        console.error('Error getting distance:', error);
    }
}

export { calculateDistance };
