"use server"
import "server-only"
import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";
import { verifySession } from "@/lib/auth"
import { EventType, FormEventErrors, jwtUserType } from "@/types/types";
import { validateEvent } from "@/lib/validation";

export async function POST(req: Request) {
    const userData = await verifySession() as jwtUserType;
    if (!userData) return new Response("Unauthorized", { status: 401 })
    if (!userData.isAdmin == true) return new Response("Insufficient permissions", { status: 403 })
    try {
        const body = await req.json()
        const newEvent: EventType = {
            ...body, creator: parseInt(userData.userId)
        }

        // if validation fails, return errors for each field instead
        const validationErrors: FormEventErrors = validateEvent(newEvent);
        if (Object.keys(validationErrors).length != 0) {
            return new Response(JSON.stringify({...validationErrors, prevData: newEvent}), {status: 400});
        }

        
        const db = await connect();
        const createQuery = `INSERT INTO ${subDb}.events(title, creator, shortDescription, description, imageURL, price, maxSignups, groupSize, eventStart, eventEnd, signupDeadline, locationName, address, addressPostCode, addressCity, contactInfo)
        OUTPUT INSERTED.id
        VALUES (@title, @creator, @shortDescription, @description, @imageURL, @price, @maxSignups, @groupSize, @eventStart, @eventEnd, @signupDeadline, @locationName, @address, @addressPostCode, @addressCity, @contactInfo);`;
        const result = await db.request()
        .input('title', newEvent.title)
        .input('creator', newEvent.creator)
        .input('shortDescription', newEvent.shortDescription)
        .input('description', newEvent.description)
        .input('imageURL', newEvent.imageURL)
        .input('price', newEvent.price)
        .input('maxSignups', newEvent.maxSignups)
        .input('groupSize', newEvent.groupSize)
        .input('eventStart', newEvent.eventStart)
        .input('eventEnd', newEvent.eventEnd)
        .input('signupDeadline', newEvent.signupDeadline)
        .input('locationName', newEvent.locationName)
        .input('address', newEvent.address)
        .input('addressPostCode', newEvent.addressPostCode)
        .input('addressCity', newEvent.addressCity)
        .input('contactInfo', newEvent.contactInfo)
        .query(createQuery);

        return new Response(JSON.stringify({createdId: result.recordset[0].id, message: "success"}))

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), { status: 500 })
    }
}