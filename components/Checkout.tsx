"use client";
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "./ui/button";
import LoadingSpinner from "./LoadingSpinner";
import { BASE_URL } from "@/config/constants";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: BASE_URL + "/checkout/success",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message ? error.message : "An error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element"  />
            <Button size="lg" className="w-full mt-8" disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? (
                        <LoadingSpinner></LoadingSpinner>
                    ) : (
                        "Betal"
                    )}
                </span>
            </Button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}

export default function CheckoutForm({
    clientSecret,
}: {
    clientSecret: string;
}) {
    const appearance: Appearance = {
        theme: "flat",
        variables: {
            colorPrimary: "#124B33",
            colorBackground: "#EFEFEA",
        },
    };
    return (
        <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
            <PaymentForm />
        </Elements>
    );
}
