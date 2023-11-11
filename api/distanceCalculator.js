async function calculateDistance(origin, destination) {
    try {
        const originStr = `${origin.lat},${origin.lng}`;
        const destinationStr = `${destination.lat},${destination.lng}`;

        const response = await fetch(`http://localhost:3000/distance?originStr=${originStr}&destinationStr=${destinationStr}`);

        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

export { calculateDistance };
