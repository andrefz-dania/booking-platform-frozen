import { BASE_URL } from "@/config/constants";
import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";
import { getSessionData } from "@/lib/auth";
import { validateJoin } from "@/lib/validation";
import { jwtUserType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: RouteContext<"/api/event/join/[id]">
) {
    const { id } = await params;
    const data = await req.json();
    const userData = await getSessionData() as jwtUserType

    try {
        if (!id) throw new Error("No ID provided");
        const validationErrors = await validateJoin(data);
        if (Object.keys(validationErrors.groupErrors).length > 0 || validationErrors.personErrors.length > 0)
        {
            return NextResponse.json(validationErrors, {status: 400 });
        }

        let creatorId = null;
        if (userData && userData.userId) creatorId = userData.userId;

        // create an order in the database
        const db = await connect();
        const query = `INSERT INTO ${subDb}.bookings (eventId, creatorId, groupName, groupLeader, participantsJSON) OUTPUT INSERTED.id VALUES (@eventId, @creatorId, @groupName, @groupLeader, @participantsJSON);`;
        const result = await db.request()
        .input('eventId', id)
        .input('creatorId', creatorId)
        .input('groupName', data.groupFormData.groupName)
        .input('groupLeader', data.groupFormData.groupLeader)
        .input('participantsJSON', JSON.stringify(data.participants))
        .query(query);

        const bookingId = result.recordset[0].id;
        if (result.rowsAffected && result.rowsAffected.length === 1) {
            return NextResponse.json({checkoutURL:BASE_URL+`/checkout?bookingId=${bookingId}&eventId=${id}` })
            //return NextResponse.redirect(BASE_URL+`/checkout?bookingId=${bookingId}?eventId=${id}`)
        } else throw new Error("Database failed to add the booking")
        // change this to a redirect with eventNo and OrderNo
        return NextResponse.json({message: "no errors"})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}
