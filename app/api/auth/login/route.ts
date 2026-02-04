"use server";
import bcrypt from "bcryptjs";
import { connect } from "@/db/db.server";
import { subDb } from "@/config/dbconfig";
import { createSession } from "@/lib/auth";
import { jwtUserType } from "@/types/types";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const db = await connect();

    // check for matching users
    const existingUserQuery = `SELECT * FROM ${subDb}.users WHERE email=@email`;
    const response = await db
        .request()
        .input("email", email)
        .query(existingUserQuery);

    const existingUser = response.recordset[0];

    if (!existingUser) {
        console.log(
            `⚠️ Authentication error: No user with email ${email} found`
        );

        return new Response(
            JSON.stringify({
                validationErrors: [
                   {email: "Incorrect email"}
                ]
            }),
            { status: 403 }
        );
    }

    // validate password
    const passwordMatch = await bcrypt.compare(
        password.toString(),
        existingUser.hashedPassword
    );

    if (!passwordMatch) {
        console.log(
            `⚠️ Authentication error: Incorrect password for user ${existingUser.email}`
        );

        return new Response(
            JSON.stringify({
                validationErrors: [
                   {email: "Incorrect password"}
                ]
            }),
            { status: 403 }
        );
    } else {

        const sessionUser: jwtUserType = {
            userId: existingUser.id.toString(),
            isAdmin: existingUser.isAdmin,
            isCreator: existingUser.isCreator
        }

        const accessToken = await createSession(sessionUser);

        return new Response(
            JSON.stringify({ accessToken: accessToken }), {status: 200}
        );
    }
}
