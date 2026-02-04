import { EventType } from "@/types/types";
import PageHeading from "./text/PageHeading";
import TextBlock from "./text/TextBlock";
import Hr from "./text/Hr";
import { Button } from "./ui/button";
import {
    ChevronRight,
    ClockCheck,
    ClockIcon,
    Coins,
    GripIcon,
    MapPin,
    UserRoundPen,
    UsersIcon,
} from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { formatDate, formatPrice, formatTime } from "@/lib/formatters";
import CopyButton from "./CopyButton";
import ParticipantsCard from "./ParticipantsCard";
import AdminControls from "./AdminControls";
import Link from "next/link";

export default function EventDetails({ event }: { event: EventType }) {
    const startDate = formatDate(new Date(event.eventStart));
    const startTime = formatTime(new Date(event.eventStart));

    const endDate = formatDate(
        new Date(event.eventEnd ? event.eventEnd : new Date())
    );
    const endTime = formatTime(
        new Date(event.eventEnd ? event.eventEnd : new Date())
    );

    const signupDate = formatDate(new Date(event.signupDeadline));
    const signupTime = formatTime(new Date(event.signupDeadline));

    const price = formatPrice(event.price);
    const personPrice = formatPrice(
        event.groupSize ? event.price / event.groupSize : event.price
    );

    const groupEvent = !!(event.groupSize && event.groupSize > 1)
    

    return (
        <div>
            <AdminControls id={event.id}></AdminControls>
            <PageHeading>{event.title}</PageHeading>
            <TextBlock>{event.description}</TextBlock>
            <div className="p-4 flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <UsersIcon size={24} className="text-primary" />
                    <p>
                        <span className="text-lg font-bold">
                            {event.groupSize ?? 1}{" "}
                        </span>
                        <span className="text-muted-foreground">
                            {" "}
                            pers. / hold
                        </span>
                    </p>
                </div>
                {event.maxSignups && (
                    <div className="flex flex-row gap-4">
                        <GripIcon size={24} className="text-primary" />

                        <p>
                            <span className="text-lg font-bold">
                                {event.maxSignups}{" "}
                            </span>
                            <span className="text-muted-foreground">
                                {" "}
                                Max deltagere i alt
                            </span>
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row place-content-between items-center px-4">
                <div className="flex items-center flex-row gap-2 place-content-start text-left">
                    <Coins size={36} className="text-primary" />
                    <div>
                        <p>
                            <span className="text-lg font-bold">{price} </span>
                            <span className="text-muted-foreground">
                                {groupEvent  ? " / pers" : " / hold"}
                            </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-bold">{personPrice} </span> /
                            person
                        </p>
                    </div>
                </div>
                <Link href={`/events/${event.id}/join`}>
                    <Button
                        size="lg"
                        className="w-full md:w-fit max-w-sm mx-auto md:mx-0"
                    >
                        Tilmelding
                        <ChevronRight
                            size={12}
                            className="scale-150"
                        ></ChevronRight>
                    </Button>
                </Link>
            </div>

            <Hr></Hr>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 text-lg">
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary flex flex-row gap-4">
                            <MapPin size={32} strokeWidth={3} />
                            <h2>Adresse</h2>
                        </CardTitle>
                        <CardAction>
                            <CopyButton
                                string={
                                    event.locationName +
                                    ", " +
                                    event.address +
                                    ", " +
                                    event.addressPostCode +
                                    " " +
                                    event.addressCity
                                }
                            />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p>{event.locationName}</p>
                            <p>{event.address}</p>
                            <p>
                                {event.addressPostCode} {event.addressCity}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary flex flex-row gap-4">
                            <ClockIcon size={32} strokeWidth={3} />
                            <h2>Start tidspunkt</h2>
                        </CardTitle>
                        <CardAction>
                            <CopyButton
                                string={startDate + ", kl " + startTime}
                            />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p>{startDate}</p>
                            <p>{startTime}</p>
                        </div>
                    </CardContent>
                </Card>
                {event.eventEnd && (
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary flex flex-row gap-4">
                                <ClockCheck size={32} strokeWidth={3} />
                                <h2>Slut tidspunkt</h2>
                            </CardTitle>
                            <CardAction>
                                <CopyButton
                                    string={endDate + ", kl " + endTime}
                                />
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <p>{endDate}</p>
                                <p>{endTime}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary flex flex-row gap-4">
                            <UserRoundPen size={32} strokeWidth={3} />
                            <h2>Tilmeldingsfrist</h2>
                        </CardTitle>
                        <CardAction>
                            <CopyButton
                                string={signupDate + ", kl " + signupTime}
                            />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p>{signupDate}</p>
                            <p>{signupTime}</p>
                        </div>
                    </CardContent>
                </Card>
                {event.id && (
                    <ParticipantsCard
                        eventId={event.id}
                        maxSignups={event.maxSignups}
                        groupSize={event.groupSize}
                    />
                )}
            </div>
        </div>
    );
}
