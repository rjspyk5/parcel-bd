"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link"
import { handleLogin } from "../services/AuthServices"

import { toast } from "sonner"
import { useRouter } from "next/navigation"


type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await handleLogin({ payload: data })
      toast.success("Login successful")
      router.push("/dashboard")

    } catch (error: any) {

      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials."

      toast.error(message)
      console.log(error?.response?.data)
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="m@example.com"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                    required
                  />
                </Field>

                <Field>
                  <Button type="submit">Login</Button>
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/registration">Sign up</Link>
                </FieldDescription>
              </FieldGroup>
            </form>

            <div className="bg-muted relative hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>

        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  )
}
