import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const urlParams = req.nextUrl.searchParams.toString();

    // split the search term into the query and the parameter
    const query = urlParams.split('=')[1];
    // replace + with space
    const searchTerm = "%"+query.replace(/\+/g, ' ')+"%";

    // sanitize search input for SQL injection
    const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9]/g, '');



    try {

        // no search term returns latest events

        if (sanitizedSearchTerm.length <= 0) {
            const query = `SELECT TOP 10 * FROM ${subDb}.events WHERE deleted=0 ORDER BY eventStart`;
            const db = await connect();
            const result = await db.request().query(query);
            return new Response(JSON.stringify(result.recordset));
        }

        // apply search to db query
        const query = `SELECT * FROM ${subDb}.events WHERE title LIKE @searchTerm AND deleted=0 ORDER BY eventStart`;
        const db = await connect();
        const result = await db.request().input('searchTerm', searchTerm).query(query);
        return new Response(JSON.stringify(result.recordset));
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: "Database was unable to fulfill the search" }), { status: 500 });
    }
}