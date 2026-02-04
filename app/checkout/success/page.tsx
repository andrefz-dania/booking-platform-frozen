import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleCheck, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const STATUS_CONTENT_MAP = {
    succeeded: {
        text: "Betaling modtaget",
    },
    processing: {
        text: "Your payment is processing.",
    },
    requires_payment_method: {
        text: "Your payment was not successful, please try again.",
    },
    default: {
        text: "Something went wrong, please try again.",
    },
    canceled: {
        text: "Payment canceled",
    },
    requires_action: {
        text: "unhandled",
    },
    requires_capture: {
        text: "unhandled",
    },
    requires_confirmation: {
        text: "unhandled",
    },
};

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const { payment_intent: paymentIntentId } = await searchParams;

    if (!paymentIntentId) redirect("/");

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) redirect("/");

    const { status } = paymentIntent;

    return (
        <Card className="p-4 mt-16 max-w-xl mx-auto w-full">
            <CardHeader>
                <div className="flex flex-row gap-4 font-bold text-2xl text-primary w-full place-content-center">
                    <CircleCheck size={32} strokeWidth={3} />
                    <h2>{STATUS_CONTENT_MAP[status].text} </h2>
                </div>
            </CardHeader>
            <div id="payment-status">
                {/* <div id="status-icon" style={{backgroundColor: STATUS_CONTENT_MAP[status].iconColor}}>
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <h2 id="status-text">{STATUS_CONTENT_MAP[status].text}</h2>
      {paymentIntent && <div id="details-table">
        <table>
          <tbody>
            <tr>
              <td className="TableLabel">id</td>
              <td id="intent-id" className="TableContent">{paymentIntentId}</td>
            </tr>
            <tr>
              <td className="TableLabel">status</td>
              <td id="intent-status" className="TableContent">{status}</td>
            </tr>
          </tbody>
        </table>
      </div>} */}
                {/* {paymentIntent && <Link href={`https://dashboard.stripe.com/payments/${paymentIntentId}`} id="view-details" target="_blank" ><Button>View details</Button>
      </Link>}
      <Link id="retry-button" href="/"><Button variant={'outline'}>Test another</Button></Link> */}
            </div>
            <CardContent className="w-full">
              <Link href={"/"} className="w-full flex place-content-center">
              <Button size={"lg"} className="w-full max-w-sm">
                Tilbage til forsiden <Undo2></Undo2>
              </Button>
              </Link>
            </CardContent>
        </Card>
    );
}
