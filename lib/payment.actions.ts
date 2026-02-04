
"use server";
import { subDb } from "@/config/dbconfig";
import { connect } from "@/db/db.server";
import "server-only";

export async function completePayment(paymentId: string) {

    console.log("payment completion attempted, payment id: " + paymentId);

    let success = false;
    try {
        const db = await connect();
        const query = `UPDATE ${subDb}.bookings SET paid = @paid WHERE paymentId = @paymentId`;
        const result = await db.request()
        .input("paid", true)
        .input("paymentId", paymentId)
        .query(query);
        success = true;

        console.log(result);
        if (!result || !result.rowsAffected || result.rowsAffected.length !== 1)
            {
                success = false;
                throw new Error("database insertion failed")
            }
    
    } catch (error) {
        console.error(error)
        throw error;
    }
    return success;
}

export async function addPaymentId(bookingId: number, paymentId: string) {

    let success = false;
    console.log("payment creation attempted, Booking id: " + bookingId + " payment id: " + paymentId);

    try {
        if (!bookingId || !paymentId) throw new Error("Booking or payment ID missing")

        const db = await connect();
        const query = `UPDATE ${subDb}.bookings SET paymentId = @paymentId WHERE id = @id`;
        const result = await db.request()
        .input("paymentId", paymentId)
        .input("id", bookingId)
        .query(query);
        success = true;
        console.log("TEST");
        console.log(result);
        if (!result || !result.rowsAffected || result.rowsAffected.length !== 1)
        {
            success = false;
            throw new Error("database insertion failed")
        }

    
    } catch (error) {
        console.error(error)
        throw error;
    }
    return success;
}



export async function deleteBooking() {
    // todo: delete/clear up unpaid and cancelled bookings
}