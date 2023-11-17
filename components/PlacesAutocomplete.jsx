"use client";
import { Divider } from "@mantine/core";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

export default function PlacesAutocomplete({ onLocationSelect }) {
  const apiKey = "AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y";

  const handleLocationSelect = async (selected) => {
    const results = await geocodeByAddress(selected.label);
    const latLng = await getLatLng(results[0]);
    const vals = { coordinates: latLng, label: selected.label };
    onLocationSelect(vals);
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <GooglePlacesAutocomplete
        style={{ backgroundColor: "#fff" }}
        apiKey={apiKey}
        autocompletionRequest={{
          componentRestrictions: { country: "AU" },
        }}
        selectProps={{
          onChange: handleLocationSelect,
        }}
      />
      <p
        style={{
          fontWeight: 500,
          fontSize: "10px",
          marginLeft: "1rem",
          color: "gray",
        }}
      >
        Select Your Address
      </p>
      <Divider style={{ margin: "1rem" }} />
    </div>
  );
}
