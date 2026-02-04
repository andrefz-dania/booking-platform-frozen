import CheckoutForm from "@/components/Checkout";
import { Card, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatters";
import { getEvent } from "@/lib/requests.server";
import { stripe } from "@/lib/stripe";
import { EventType } from "@/types/types";
import { CreditCardIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: { eventId?: string , bookingId?: string } }) {
    const params = await searchParams;
    const {eventId, bookingId} = params;


    if (!eventId || !bookingId) {
        redirect("/events")
    }

    const res = await getEvent(parseInt(eventId));
    const data = (await res.json()) as EventType;

    const { client_secret: clientSecret } = await stripe.paymentIntents.create({
        amount: data.price * 100, //payment is in cents (øre for dkk)
        currency: "dkk",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            bookingId: bookingId,
        }
    });

    if (!clientSecret) {
        return <p>wait...</p>;
    }

    return (
        <Card className="p-4 mt-16">
            <CardHeader>
                <div className="flex flex-row gap-4 font-bold text-2xl text-primary">
                    <CreditCardIcon size={32} strokeWidth={3} />
                    <h2>Betaling</h2>
                </div>
                <p>Tilmelding til {data.title}</p>
                <p>{formatPrice(data.price)}</p>
            </CardHeader>
            <CheckoutForm clientSecret={clientSecret} />
        </Card>
    );
}
