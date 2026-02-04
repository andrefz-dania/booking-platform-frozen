"use server";
import "server-only";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { refreshSession } from "@/lib/auth";

export async function GET() {
    const cookie = (await cookies()).get("session")?.value;

    if (!cookie) {
        return new Response(JSON.stringify({ message: "No session cookie found" }), {status: 401});
    }

    if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET not set");

    const data = jwt.verify(
        cookie,
        process.env.JWT_REFRESH_SECRET,
        (error, decoded) => {
            if (error) {
                return null;
            } else {
                return decoded;
            }
        }
    );

    // ensure that data cannot be of type void anymore, despite no code branch creating that situation
    if (data == undefined) {
        return new Response(JSON.stringify({ error: "Invalid session. Please log in again" }), {status: 403});
    }

    const accessToken = await refreshSession();
    return new Response(JSON.stringify({accessToken: accessToken}), {status: 200});
    
}