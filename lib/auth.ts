"use server";
import "server-only";

import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { JWT_REFRESH_EXPIRY, JWT_SESSION_EXPIRY, JWT_SHORT_EXPIRY } from "@/config/constants";
import { jwtUserType } from "@/types/types";
import { cache } from "react";
import { redirect } from "next/navigation";
import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";

export const verifySession = cache(async (): Promise<object | null> => {
    const authorization = (await headers()).get("authorization");

    if (!authorization) {
        redirect("/login");
    }

    const token = authorization.split(" ")[1];

    if (!process.env.JWT_ACCESS_SECRET)
        throw new Error("JWT_ACCESS_SECRET not set");

    const data = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET,
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
        return null;
    }

    return {...data as jwtUserType, refresh: false};
});

export const getSessionData = cache(async (): Promise<object | null> => {
    const authorization = (await headers()).get("authorization");

    if (!authorization) {
       return null
    }

    const token = authorization.split(" ")[1];

    const data = jwt.decode(token)

    // ensure that data cannot be of type void anymore, despite no code branch creating that situation
    if (data == undefined) {
        return null;
    }

    return {...data as jwtUserType, refresh: false};
});

export async function refreshSession() {

    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
        return null;
    }

    if (!process.env.JWT_REFRESH_SECRET || !process.env.JWT_ACCESS_SECRET)
        throw new Error("JWT_REFRESH_SECRET or JWT_ACCESS_SECRET not set");

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
    if (data == undefined || data == null) {
        console.log("⚠️ Verification of a refresh token failed: " + cookie);
        return null;
    }

    const decodedData = jwt.decode(cookie) as jwtUserType;

    const db = await connect();

    const refreshQuery = `SELECT refreshToken FROM ${subDb}.users WHERE id = @id`

    const dbRefreshToken = (await db.request().input('id', decodedData.userId).query(refreshQuery)).recordset[0].refreshToken;

    if (!dbRefreshToken || dbRefreshToken !== cookie) {
        console.log("⚠️ A user attempted to refresh session with an invalid token: " + + cookie);
        return null
    }

    const accessToken = jwt.sign(
        {
            userId: decodedData.userId,
            isAdmin: decodedData.isAdmin ?? false,
            isCreator: decodedData.isCreator ?? false,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: JWT_SHORT_EXPIRY }
    );

    return accessToken;
}

export async function createSession(user: jwtUserType) {
    // ensure .env is configured correctly to prevent type errors
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
        throw new Error(
            "JWT_ACCESS_SECRET and/or JWT_REFRESH_SECRET are not configured in .env"
        );
    }
    // set jwt cookie for user
    const sessionData: jwtUserType = {
        userId: user.userId,
        isAdmin: user.isAdmin ?? false,
        isCreator: user.isCreator ?? false,
    }

    const accessToken = jwt.sign(
        sessionData,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: JWT_SHORT_EXPIRY }
    );
    const refreshToken = jwt.sign(
        sessionData,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRY }
    );

    const cookieStore = await cookies();

    cookieStore.set("session", refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + JWT_SESSION_EXPIRY),
    });

    const db = await connect();
    
    const storeRefreshQuery = `UPDATE ${subDb}.users SET refreshToken=@refreshToken WHERE id=@id`
    const result = await db.request().input("refreshToken", refreshToken).input("id", sessionData.userId).query(storeRefreshQuery);
    if (result.affectedRows < 1) {
        throw new Error("Unable to set refresh token in database")
    }

    return accessToken;
}

export async function destroySession() {
    const cookieStore = await cookies();
    const cookie = (await cookies()).get("session")?.value;
    if (cookie && cookie.length > 1) {
        const decodedData = jwt.decode(cookie) as jwtUserType;

        const db = await connect();
        const deleteRefreshQuery = `UPDATE ${subDb}.users SET refreshToken=NULL WHERE id=@id`
        await db.request().input("id", decodedData.userId).query(deleteRefreshQuery);
    }

    cookieStore.delete('session');
}
