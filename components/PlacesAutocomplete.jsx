"use client"
import { useState } from 'react';
import  GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

export default function PlacesAutocomplete({ onLocationSelect }) {
    const apiKey = 'AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y'; // Replace with your actual API key
    const [value, setValue] = useState(null);
    console.log(value)
    const handleLocationSelect = async (value) => {
        onLocationSelect(value);
        const results = await geocodeByAddress(value.label);
        const latLng = await getLatLng(results[0]);
        setValue(latLng);
    };



    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey={apiKey}
                autocompletionRequest={{
                    componentRestrictions: { country: 'AU' }, // Restrict to Australia
                }}
                selectProps={{
                    value,
                    onChange: handleLocationSelect
                }}
            />
        </div>
    );
}
