"use client"
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function PlacesAutocomplete({ onLocationSelect }) {
    const apiKey = 'AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y'; // Replace with your actual API key
    const [value, setValue] = useState(null);

    const handleLocationSelect = (value) => {
        onLocationSelect(value);
        setValue(value)
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
