import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";

export async function GET(
    req: Request,
    { params }: RouteContext<"/api/event/[id]/participants">
) {
    const { id } = await params;

    try {
        const query = `SELECT id, groupName, groupLeader, participantsJSON FROM ${subDb}.bookings WHERE eventId=@id AND paid=1`;
        const db = await connect();
        const result = await db.request().input("id", id).query(query);

        if (!result.recordset[0]) {
            return new Response(JSON.stringify({ error: "Event not found" }), {
                status: 404,
            });
        }

        type ParticiPantGroup = {
            id: number;
            participantsJSON: string;
        }

        type Participant = {
            firstName: string;
            lastName: string;
        }

        const returnData = result.recordset.map((g : ParticiPantGroup, i: number) => {
             //convert the participants stringified json in the DB into an object for each group in array
            const participants = JSON.parse(g.participantsJSON);

            // remove member numbers and post code data from participants
            const cleanedParticipants = participants.map((participant: Participant) => ({firstName: participant.firstName, lastName: participant.lastName}));
            const data = {
                id: result.recordset[i].id,
                groupName: result.recordset[i].groupName ?? null,
                groupLeader: result.recordset[i].groupLeader ?? null,
                participants: cleanedParticipants
            }
            return data;
        });
        

        

        return new Response(JSON.stringify(returnData), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: "Failed to retrieve event" }),
            { status: 500 }
        );
    }
}