"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("../MapPicker/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">Loading map...</div>
  ),
});

type Address = {
  address: string;
  lat: number;
  lng: number;
};

type Props = {
  value: Address | null;
  onSelect: (v: Address) => void;
};

export default function AddressSearch({ value, onSelect }: Props) {
  const [query, setQuery] = useState(value?.address || "");
  const [results, setResults] = useState<any[]>([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (value?.address) setQuery(value.address);
  }, [value]);

  const search = async (text: string) => {
    setQuery(text);

    if (text.length < 3) return setResults([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${text}&format=json&addressdetails=1`
    );

    setResults(await res.json());
  };

  const handleMapSelect = (loc: { lat: number; lng: number; address?: string }) => {
    const addr = loc.address || `${loc.lat}, ${loc.lng}`;
    onSelect({ address: addr, lat: loc.lat, lng: loc.lng });
    setQuery(addr);
    setShowMap(false);
    setResults([]);
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Search address..."
          value={query}
          onChange={(e) => search(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="px-3 py-2 rounded bg-gray-100 border hover:bg-gray-200"
        >
          Pick on map
        </button>
      </div>

      {results.length > 0 && (
        <div className="border rounded mt-1 bg-white max-h-52 overflow-y-auto z-50 relative">
          {results.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect({
                  address: item.display_name,
                  lat: Number(item.lat),
                  lng: Number(item.lon),
                });
                setResults([]);
              }}
            >
              {item.display_name}
            </div>
          ))}
        </div>
      )}

      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowMap(false)}
          />

          <div className="bg-white rounded shadow-lg w-[95%] md:w-3/4 lg:w-1/2 z-10 p-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Select location on map</h3>
              <button
                className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setShowMap(false)}
              >
                Close
              </button>
            </div>

            <div className="h-80 min-h-[300px]">
              <MapPicker
                value={value ? { lat: value.lat, lng: value.lng, address: value.address } : null}
                onChange={(loc) => handleMapSelect(loc)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
