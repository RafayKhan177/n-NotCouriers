"use client"
import React, { useState, useEffect } from 'react';

function DistanceMatrix() {
  const [distanceData, setDistanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(distanceData)

  const API_KEY = "AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y"

  useEffect(() => {
    // Define the API URL with your parameters
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=enc%3A_kjwFjtsbMt%60EgnKcqLcaOzkGari%40naPxhVg%7CJjjb%40cqLcaOzkGari%40naPxhV%3A&origins=40.6655101%2C-73.89188969999998&key=AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y`

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDistanceData(data);
        console.log(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Distance Matrix Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* <p>Distance: {distanceData.rows[0].elements[0].distance.text}</p>
          <p>Duration: {distanceData.rows[0].elements[0].duration.text}</p> */}
        </div>
      )}
    </div>
  );
}

export default DistanceMatrix;
