import { connect } from "@/db/db.server"
import { memberListDb } from "@/config/dbconfig";

export async function GET(
    req: Request,
    { params }: RouteContext<"/api/auth/user-data/[id]">
) {
    const { id } = await params;
    const db = await connect();
    //return new Response(JSON.stringify({message: "endpoint disabled"}))

    try {
        const query = `SELECT TOP 1 surname, name FROM ${memberListDb} WHERE PRIMAERKLUB = 9999 AND Id = @id`
        const result = await db.request().input('id', id).query(query);
        return new Response(JSON.stringify(result.recordset), {status: 200});
    
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
          status: 500,
        });
    }

}