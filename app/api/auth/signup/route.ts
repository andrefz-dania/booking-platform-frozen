"use server";
import bcrypt from "bcryptjs";
import { connect } from "@/db/db.server";
import { subDb, memberListDb } from "@/config/dbconfig";
import { validateEmail, validatePostcode } from "@/lib/validation";
import { FormSignupErrors } from "@/types/types";

export async function POST(req: Request) {
    const { email, password, memberNo, postCode } = await req.json();
    const validationErrors: FormSignupErrors = {};

    try {
        const db = await connect();


        // ensure that all fields are filled
        if (!email) {
            validationErrors.email = "Email er påkrævet";
        }
        if (!password) {
            validationErrors.password = "Adgangskode er påkrævet";
        }
        if (!memberNo) {
            validationErrors.memberNo = "Medlemsnummer er påkrævet";
        }
        if (!postCode) {
            validationErrors.postCode = "Postnummer er påkrævet";
        }

        // validate email and post code syntax with eternal regex functions
        if (!validateEmail(email)) {
            validationErrors.email = "Ikke gylding e-mail addresse";
        }
        if (!validatePostcode(parseInt(postCode))) {
            validationErrors.postCode = "Postnummer format passer ikke";
        }

        // validate memberNo syntax
        if (memberNo.replace(/[0-9]/g, '').length > 0) {
            validationErrors.memberNo = "Medlemsnummer format passer ikke"
        }

        // duplicate return statement to skip database query if not needed
        // if there are validation errors by now, return them to the client and exit early
        if (Object.keys(validationErrors).length != 0) {
            return new Response(JSON.stringify(validationErrors), {
                status: 400,
            });
        }

        // check if a user with that member number exists in the other database
        const validUsersQuery = `SELECT Id, Name, Surname, NormalizedEmailAddress, PRIMAERKLUB FROM ${memberListDb} WHERE Id = @memberNo AND PRIMAERKLUB = 9999`;
        const validUsers = await db
            .request()
            .input("memberNo", parseInt(memberNo))
            .query(validUsersQuery);

        const validUser = validUsers.recordset[0];

        // check if a user with that email or member number already exists in the login database
        const existingUserQuery = `SELECT * FROM ${subDb}.users WHERE email = @email OR memberNo = @memberNo`;
        const existingUsers = await db
            .request()
            .input("email", email)
            .input("memberNo", parseInt(memberNo))
            .query(existingUserQuery);

        const existingUser = existingUsers.recordset[0];

        // set validation errors for existing users, or invalid user
        if (existingUser && existingUser.email == email) {
            validationErrors.email = "E-mail allerede i brug";
        }
        if (existingUser && existingUser.memberNo == memberNo) {
            validationErrors.memberNo =
                "Medlemsnummer allerede i brug";
        }
        if (!validUser) {
            validationErrors.memberNo = "Medlemsnummer ikke fundet";
        }

        // return validation errors if they exist
        if (Object.keys(validationErrors).length != 0) {
            return new Response(
                JSON.stringify(validationErrors),
                { status: 400 }
            );
        }

        // continue to use creation once validation is over
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email: email.toLowerCase(),
            password: hashedPassword,
            memberNo: validUser.Id,
            postCode: parseInt(postCode),
        };

        const creationQuery = `INSERT INTO ${subDb}.users (
                email, hashedPassword, memberNo, postCode
            ) VALUES (@email, @pw, @memberNo, @postCode)`;

        const creationResult = await db
            .request()
            .input("email", newUser.email)
            .input("pw", newUser.password)
            .input("memberNo", newUser.memberNo)
            .input("postCode", newUser.postCode)
            .query(creationQuery);

        if (creationResult.rowsAffected == 0)
            throw new Error(`Could not create user ${newUser.email}`);

        console.log(
            `✅ Successfully created user ${newUser.memberNo} / ${newUser.email}`
        );
        return new Response(
            JSON.stringify({
                message: `successfully created user ${newUser.email}`,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
}
