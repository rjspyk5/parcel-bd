"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AddressSearch from "@/components/shared/AdressSearch/AdressSearch";

const MapPicker = dynamic(() => import("@/components/shared/MapPicker/MapPicker"), {
  ssr: false,
});

type Location = {
  address: string;
  lat: number;
  lng: number;
};

export default function BookParcel() {
  const { register, handleSubmit } = useForm();

  const [pickup, setPickup] = useState<Location | null>(null);
  const [delivery, setDelivery] = useState<Location | null>(null);

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      pickup,
      delivery,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Book Parcel</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Sender */}
        <input
          {...register("senderName")}
          placeholder="Sender Name"
          className="border px-3 py-2 rounded w-full"
        />

        {/* Pickup */}
        <div>
          <label>Pickup Address</label>

          <AddressSearch value={pickup} onSelect={setPickup} />

          <MapPicker value={pickup} onChange={setPickup} />
        </div>

        {/* Delivery */}
        <div>
          <label>Delivery Address</label>

          <AddressSearch value={delivery} onSelect={setDelivery} />

          <MapPicker value={delivery} onChange={setDelivery} />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
