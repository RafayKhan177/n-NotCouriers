"use client";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

export default function PlacesAutocomplete({ onLocationSelect }) {
    const apiKey = 'AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y'; 

    
    const handleLocationSelect = async (selected) => {
        const results = await geocodeByAddress(selected.label);
        const latLng = await getLatLng(results[0]);
        const vals = { coordinates: latLng, label: selected.label }
        onLocationSelect(vals);
       
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey={apiKey}
                autocompletionRequest={{
                    componentRestrictions: { country: 'AU' },
                }}
                selectProps={{
                    onChange: handleLocationSelect,
                }}
            />
        </div>
    );
}
