import { connect } from "@/db/db.server"
import { memberListDb, subDb } from "@/config/dbconfig";
import { verifySession } from "@/lib/auth";
import { jwtUserType, ProfileData } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET() {
    const userData = await verifySession() as jwtUserType;
    const db = await connect();
    if (!userData) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    
    try {
        const userQuery = `SELECT id, postCode, memberNo, isAdmin, createdAt, email FROM ${subDb}.users WHERE id = @id`
        const userResult = await db
        .request()
        .input('id', userData.userId)
        .query(userQuery);

        if (!userResult.recordset[0]) {
            return NextResponse.json({message: "user does not exist"}, {status: 404})
        }
        
        const memberNo = userResult.recordset[0].memberNo;
        if (!memberNo) {
            throw new Error("Member number not defined")
        }
        const dataQuery = `SELECT TOP 1 surname, name FROM ${memberListDb} WHERE PRIMAERKLUB = 9999 AND Id = @id`
        const dataResult = await db
        .request()
        .input('id', memberNo)
        .query(dataQuery);

        const user: ProfileData = {
            id: userData.userId,
            memberNo: memberNo,
            postCode: userResult.recordset[0].postCode,
            email: userResult.recordset[0].email,
            isAdmin:  userResult.recordset[0].isAdmin,
            createdAt: userResult.recordset[0].createdAt,
            firstName: dataResult.recordset[0].name,
            lastName: dataResult.recordset[0].surname
        }

        return new Response(JSON.stringify(user), {status: 200});
    
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
          status: 500,
        });
    }

}