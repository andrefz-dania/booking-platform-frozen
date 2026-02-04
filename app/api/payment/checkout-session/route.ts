import { BASE_URL } from "@/config/constants";
import { stripe } from "@/lib/stripe";
//import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        //const headersList = await headers();
        //const origin = headersList.get("origin");

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1Sv48FE9fsvB1ynB3bGFwIep',
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        if (!session.url) throw new Error("Session URL is missing");

        return NextResponse.redirect(session.url, 303)
    } catch (error) {
        console.error(error);
    }
}
