"use client";
import { Divider } from "@mantine/core";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

export default function PlacesAutocomplete({ onLocationSelect, width }) {
  const apiKey = "AIzaSyBhY9LbIHmQUmjDsSfqYjRORMiiK133u1Y";

  const handleLocationSelect = async (selected) => {
    const results = await geocodeByAddress(selected.label);
    const latLng = await getLatLng(results[0]);
    const vals = { coordinates: latLng, label: selected.label };
    onLocationSelect(vals);
  };

  return (
    <div style={{ background: "#fff" }}>
      <div
        style={{
          width:
            width === false || width === undefined || width === null
              ? "16rem"
              : "100%",
          background: "#fff",
        }}
      >
        <GooglePlacesAutocomplete
          apiKey={apiKey}
          autocompletionRequest={{
            componentRestrictions: { country: "AU" },
          }}
          selectProps={{
            onChange: handleLocationSelect,
          }}
        />
      </div>
      <Divider style={{ marginTop: ".4rem" }} />
      <p
        style={{
          fontWeight: 400,
          fontSize: "10px",
          marginLeft: "1rem",
          color: "gray",
        }}
      >
        Select Your Address
      </p>
      {/* <Divider style={{ margin: "1rem" }} /> */}
    </div>
  );
}
