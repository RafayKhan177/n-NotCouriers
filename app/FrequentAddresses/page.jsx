"use client"
import { FrequentAddresses } from '../../components/Index';
import { fetchFrequentAddresses } from '../../api/firebase/functions/fetch';
import { useEffect, useState } from 'react';

export default function Page() {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  console.log(address);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addresses = await fetchFrequentAddresses();
        setAddress(addresses);
        setIsLoading(false); // Set isLoading to false when data is ready
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? ( // Render loading state if isLoading is true
        <p>Loading...</p>
      ) : (
        <FrequentAddresses singleBtn={false} addresses={address} />
      )}
    </div>
  );
}
