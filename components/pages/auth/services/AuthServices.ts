"use server"

import axios from "axios"
import { cookies } from "next/headers"

interface payloadType {
    email: string,
    password: string
}

export async function handleLogin({
    payload,
}: {
    payload: payloadType
}) {
    const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        payload
    )

    if (result.status) {
        const token = result.data;
        (await cookies()).set({
            name: "accesstoken",
            value: token,
            httpOnly: true,
            secure: true,
            path: "/"
        })
        return { success: true }
    }

    return { success: false, message: result.message };

}
