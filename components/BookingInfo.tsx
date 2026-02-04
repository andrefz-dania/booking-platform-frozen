"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useToken } from "@/lib/providers";
import { getBookingStatus } from "@/lib/requests.client";
import { BookingInfo } from "@/types/types";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { BookIcon, CheckCircle, ChevronDownIcon, CircleDashed } from "lucide-react";
import Link from "next/link";

export default function Bookings({
    bookingInfo,
}: {
    bookingInfo?: BookingInfo[];
}) {
    return (
        <Card className="p-0 m-0 mt-16 w-full mx-auto hover:bg-accent/50">
            <Collapsible className="group data-open:bg-accent rounded-md">
                <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row w-full place-content-between p-4">
                        <CardTitle className="text-xl font-bold text-primary flex flex-row gap-4">
                            <BookIcon size={24} strokeWidth={3} />
                            <h2>Tilmeldinger</h2>
                        </CardTitle>
                        {bookingInfo ? (
                            <ChevronDownIcon size={24}></ChevronDownIcon>
                        ) : (
                            <LoadingSpinner size={100}></LoadingSpinner>
                        )}
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-2 mt-2 px-4 mb-4">
                        <div className="w-full flex flex-row place-content-between px-4 font-bold text-muted-foreground">
                            <p>Titel</p>
                            <p>Betalingsstatus</p>
                        </div>
                    {bookingInfo &&
                        bookingInfo.map((b) => {
                            return (
                                <Link key={b.id} href={"/events/" + b.eventId}>
                                    <Card className="w-full flex flex-row px-4 py-2 m-0 place-content-between hover:bg-accent/50 hover:-translate-y-1 transition-all">
                                        <h4 className="font-bold">
                                            {b.eventTitle}
                                        </h4>
                                        {b.paid ? (
                                            <div className="flex flex-row gap-2">
                                                <p>Betalt</p>
                                                <CheckCircle />
                                            </div>
                                        ) : (
                                            <div className="flex flex-row gap-2 text-muted-foreground">
                                            <p>Afventer</p>
                                            <CircleDashed />
                                        </div>
                                        )}
                                    </Card>
                                </Link>
                            );
                        })}
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
