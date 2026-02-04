import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";
import { getSessionData } from "@/lib/auth";
import { jwtUserType } from "@/types/types";

export async function GET() {
    const userData: jwtUserType | null =
        (await getSessionData()) as jwtUserType;

    if (!userData || !userData.userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    try {
        const db = await connect();
        const query = `SELECT 
                            b.id, 
                            b.eventId, 
                            b.paid, 
                            e.title AS eventTitle
                        FROM ${subDb}.bookings b
                        INNER JOIN ${subDb}.events e ON b.eventId = e.id
                        WHERE creatorId = @id
`;
        const result = await db
            .request()
            .input("id", userData.userId)
            .query(query);
        return new Response(JSON.stringify(result.recordset), { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
}
