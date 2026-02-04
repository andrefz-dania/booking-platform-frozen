"use server";

import { destroySession} from "@/lib/auth";

export async function GET() {
    // const sessionData = await verifySession() as jwtUserType;

    // if (!sessionData || sessionData == null) {
    //     return new Response(JSON.stringify({message: "Unable to log out when not logged in"}), {status: 401})
    // }

    try {
        // const db = await connect();
        
        // const deleteQuery = `UPDATE ${subDb}.users SET refreshToken = NULL WHERE id = @id`
        // const result = await db.request().input('id', sessionData.userId).query(deleteQuery);

        // if (result.affectedRows < 1) {
        //     throw new Error('The database failed to update session data');
        // }


        await destroySession();

        return new Response(JSON.stringify({message: "Logged out successfully"}), {status: 200});

    } catch (error) {
        console.error("Error in logout function:", error);
        return new Response(JSON.stringify({error: error}), {status: 500});

    }
    
}