import { EventType } from "@/types/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Banknote, Calendar, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function EventCard({ event }: { event: EventType }) {
    const date = new Date(event.eventStart);
    const formattedDate = date.toLocaleDateString("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    const formattedPrice = new Intl.NumberFormat("da-DK", {
        style: "currency",
        currency: "DKK",
    }).format(event.price);

    return (
        <Link href={`/events/${event.id}`}>
        <Card className="flex flex-row hover:bg-accent/50 hover:-translate-y-1 transition-all">
            <div className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">
                        {event.title}
                    </CardTitle>
                    <CardDescription>{event.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-2 my-2">
                        <MapPin />
                        <div>
                            <p>{event.locationName}</p>
                            <p>
                                {event.address}
                                {/* Only display the comma if there is a post code or city */}
                                {event.addressPostCode || event.addressCity ? ", " : ""}
                                {event.addressPostCode} {event.addressCity}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 my-2">
                        <Calendar />
                        <div>
                            <p>{formattedDate}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 my-2">
                        <Banknote />
                        <div>
                            <p>{formattedPrice}</p>
                        </div>
                    </div>
                </CardContent>
            </div>
            <div className="flex items-center">
                    <ChevronRight size={64} className="text-primary" strokeWidth={1.5}/>
                </div>
        </Card>
            </Link>
    );
}
