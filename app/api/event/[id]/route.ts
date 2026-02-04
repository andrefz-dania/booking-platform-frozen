import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";
import { verifySession } from "@/lib/auth";
import { jwtUserType } from "@/types/types";

export async function GET(
    req: Request,
    { params }: RouteContext<"/api/event/[id]">
) {
    const { id } = await params;

    try {
        const query = `SELECT * FROM ${subDb}.events WHERE id=@id AND deleted=0`;
        const db = await connect();
        const result = await db.request().input("id", id).query(query);

        if (!result.recordset[0]) {
            return new Response(JSON.stringify({ error: "Event not found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(result.recordset[0]), {
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

export async function DELETE(
    req: Request,
    { params }: RouteContext<"/api/event/[id]">
) {
    const { id } = await params;
    const userData = await verifySession() as jwtUserType;
    if (!userData) return new Response("Unauthorized", { status: 401 })
    if (!userData.isAdmin == true) return new Response("Insufficient permissions", { status: 403 })

    try {
        const query = `UPDATE ${subDb}.events SET deleted=@deleted WHERE id=@id`;
        const db = await connect();
        await db
            .request()
            .input("deleted", true)
            .input("id", id)
            .query(query);
        console.log(`🗑️ Event ${id} deleted by admin`)

        return new Response(JSON.stringify({ message: "Event deleted" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
