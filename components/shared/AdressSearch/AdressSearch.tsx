"use client";

import { useEffect, useState } from "react";

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

  return (
    <div>
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Search address..."
        value={query}
        onChange={(e) => search(e.target.value)}
      />

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
    </div>
  );
}
