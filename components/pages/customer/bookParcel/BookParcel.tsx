'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  senderName: string
  senderPhone: string
  pickupAddress: string
  receiverName: string
  receiverPhone: string
  deliveryAddress: string
  parcelSize: string
  paymentType: string
  deliveryCharge: number
}

const BookParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">

      <h2 className="text-2xl font-semibold mb-4">Book a Parcel</h2>

      {/* Sender Info */}
      <div>
        <label className="block mb-1">
          Sender Name <span className="text-red-500">*</span>
        </label>
        <Input {...register("senderName", { required: true })} />
        {errors.senderName && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block mb-1">
          Sender Phone <span className="text-red-500">*</span>
        </label>
        <Input type="tel" {...register("senderPhone", { required: true })} />
        {errors.senderPhone && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block mb-1">
          Pickup Address <span className="text-red-500">*</span>
        </label>
        <Input {...register("pickupAddress", { required: true })} />
        {errors.pickupAddress && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Receiver Info */}
      <div>
        <label className="block mb-1">
          Receiver Name <span className="text-red-500">*</span>
        </label>
        <Input {...register("receiverName", { required: true })} />
        {errors.receiverName && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block mb-1">
          Receiver Phone <span className="text-red-500">*</span>
        </label>
        <Input type="tel" {...register("receiverPhone", { required: true })} />
        {errors.receiverPhone && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block mb-1">
          Delivery Address <span className="text-red-500">*</span>
        </label>
        <Input {...register("deliveryAddress", { required: true })} />
        {errors.deliveryAddress && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Parcel */}
      <div>
        <label className="block mb-1">
          Parcel Size <span className="text-red-500">*</span>
        </label>
        <Input placeholder="e.g., Small / Medium / Large" {...register("parcelSize", { required: true })} />
        {errors.parcelSize && <span className="text-red-500 text-sm">Required</span>}
      </div>

      {/* Payment */}
      <div>
        <label className="block mb-1">
          Payment Type <span className="text-red-500">*</span>
        </label>
        <select
          className="border rounded px-3 py-2 w-full"
          {...register("paymentType", { required: true })}
        >
          <option value="">Select</option>
          <option value="cod">Cash on Delivery (COD)</option>
          <option value="prepaid">Prepaid</option>
        </select>
        {errors.paymentType && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <div>
        <label className="block mb-1">
          Delivery Charge <span className="text-red-500">*</span>
        </label>
        <Input type="number" {...register("deliveryCharge", { required: true })} />
        {errors.deliveryCharge && <span className="text-red-500 text-sm">Required</span>}
      </div>

      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  )
}

export default BookParcel
