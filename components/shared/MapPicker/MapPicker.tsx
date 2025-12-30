"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

type Location = {
  lat: number;
  lng: number;
  address: string;
};

type Props = {
  value: Location | null;
  onChange: (v: Location) => void;
};

const markerIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationSelector({ onPick }: { onPick: (loc: Location) => void }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );

      const data = await res.json();

      onPick({
        lat,
        lng,
        address: data.display_name || "Unknown location",
      });
    },
  });

  return null;
}

export default function MapPicker({ value, onChange }: Props) {
  const [position, setPosition] = useState<Location | null>(value);

  useEffect(() => {
    setPosition(value);
  }, [value]);

  return (
    <MapContainer
      center={
        position
          ? [position.lat, position.lng]
          : [23.8103, 90.4125] // Dhaka default
      }
      zoom={13}
      style={{ height: 350, width: "100%", borderRadius: 8 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {position && (
        <Marker position={[position.lat, position.lng]} icon={markerIcon} />
      )}

      <LocationSelector
        onPick={(loc) => {
          setPosition(loc);
          onChange(loc);
        }}
      />
    </MapContainer>
  );
}
