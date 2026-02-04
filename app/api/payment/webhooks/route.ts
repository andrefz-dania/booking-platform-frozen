import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { addPaymentId, completePayment } from "@/lib/payment.actions";

export async function POST(req: NextRequest) {
    let event;

    try {
        const headerData = (await headers()).get("stripe-signature")
        if (!headerData) throw new Error("Header missing");
        event = stripe.webhooks.constructEvent(
            await req.text(),
            headerData,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: `Webhook Error: ${error ?? "Unknown"}` },
            { status: 400 }
        );
    }

    const permittedEvents = [
        "payment_intent.succeeded",
        "payment_intent.canceled",
        "payment_intent.created",
        "payment_intent.payment_failed",
        "payment_intent.processing",
    ];

    if (permittedEvents.includes(event.type)) {
        let data;
        let success = false;
        try {
            switch (event.type) {
                case "payment_intent.succeeded":
                    data = event.data.object;
                    success = await completePayment(data.id);
                    break;
                  case "payment_intent.canceled":
                    data = event.data.object;
                    break;
                  case "payment_intent.created":
                    data = event.data.object;
                    success = await addPaymentId(parseInt(data.metadata.bookingId), data.id)
                    break;
                  case "payment_intent.processing":
                    data = event.data.object;
                    break;
                default:
                    throw new Error(`Unhandled event: ${event.type}`);
            }
            if (!success) {
                throw new Error("Payment event handler failed")
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { message: "Webhook handler failed" },
                { status: 500 }
            );
        }
    }
    return NextResponse.json({ message: "Received" }, { status: 200 });
}
