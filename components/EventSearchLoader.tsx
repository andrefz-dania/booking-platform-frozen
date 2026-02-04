import { searchEvents } from "@/lib/requests.server";
import { EventType } from "@/types/types";
import EventCard from "./EventCard";

export default async function EventSearchLoader({
    searchTerm,
}: {
    searchTerm?: string;
}) {
    "use server";
    const res = await searchEvents(searchTerm || " ");
    const events: EventType[] = await res.json();
    const noResults = events.length === 0;

    return (
        <div className="flex flex-col gap-4">
            {events.map((event) => {
                return <EventCard key={event.id} event={event}></EventCard>;
            })}
            {noResults && <p className="w-full text-center text-muted-foreground text-lg">0 resultater</p>}
        </div>
    );
}
