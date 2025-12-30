"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useState } from "react";

import AddressSearch from "@/components/shared/AdressSearch/AdressSearch";

// shadcn/ui
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MapPicker = dynamic(
  () => import("@/components/shared/MapPicker/MapPicker"),
  { ssr: false }
);

type Location = {
  address: string;
  lat: number;
  lng: number;
};

type FormValues = {
  parcelType: string;
  paymentMethod: "COD" | "Prepaid";
  codAmount?: number;
};

export default function BookParcel() {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>();

  const [pickup, setPickup] = useState<Location | null>(null);
  const [delivery, setDelivery] = useState<Location | null>(null);

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: FormValues) => {
    if (!pickup || !delivery) {
      return alert("Pickup & Delivery are required");
    }

    const payload = {
      pickup,
      delivery,
      parcelType: data.parcelType,
      paymentMethod: data.paymentMethod,
      codAmount: data.paymentMethod === "COD" ? data.codAmount || 0 : 0,
    };

    console.log("FINAL PAYLOAD:", payload);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Book a Parcel</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Pickup */}
            <div className="space-y-2">
              <Label>Pickup Address</Label>

              <AddressSearch value={pickup} onSelect={setPickup} />

            </div>

            {/* Delivery */}
            <div className="space-y-2">
              <Label>Delivery Address</Label>

              <AddressSearch value={delivery} onSelect={setDelivery} />

           
            </div>

            {/* Parcel Type */}
            <div className="space-y-2">
              <Label>Parcel Type</Label>

              <Select
                onValueChange={(value) =>
                  setValue("parcelType", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parcel type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Small Box">Small Box</SelectItem>
                  <SelectItem value="Large Box">Large Box</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>

              <Select
                onValueChange={(value: "COD" | "Prepaid") =>
                  setValue("paymentMethod", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="COD">Cash on Delivery</SelectItem>
                  <SelectItem value="Prepaid">Prepaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* COD Amount */}
            {paymentMethod === "COD" && (
              <div className="space-y-2">
                <Label>COD Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter COD amount"
                  {...register("codAmount")}
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Submit Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
