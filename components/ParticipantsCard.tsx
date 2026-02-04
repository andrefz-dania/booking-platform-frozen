import { ChevronDownIcon, UsersIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { getParticpants } from "@/lib/requests.server";
import ParticipantGroup from "./ParticipantGroup";
import { Group } from "@/types/types";

export default async function ParticipantsCard({
    eventId,
    maxSignups,
    groupSize,
}: {
    eventId: number;
    maxSignups?: number;
    groupSize?: number;
}) {
    const groups = await getParticpants(eventId);

    const groupSizeCalc = groupSize ? groupSize : 1;
    const totalParticipants = groups.length * groupSizeCalc;

    return (
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-0 m-0 hover:bg-accent/50">
            <Collapsible className="data-open:bg-accent rounded-md">
                <CollapsibleTrigger className="w-full">
                    <CardHeader className="p-4 flex flex-row w-full place-content-between">
                        <CardTitle className="text-2xl font-bold text-primary flex flex-row gap-4">
                            <UsersIcon size={32} strokeWidth={3} />
                            <div className="flex flex-row items-center gap-4">
                                <h2>Deltagere</h2>
                                {!groups.length ? (
                                    <p className="text-muted-foreground font-bold text-lg">0</p>
                                ) : (
                                    <p className="text-muted-foreground font-medium text-lg">
                                        {totalParticipants}
                                        {maxSignups && (
                                            <span> / {maxSignups}</span>
                                        )}
                                    </p>
                                )}
                            </div>
                        </CardTitle>
                        <ChevronDownIcon size={32}></ChevronDownIcon>
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                    {!groups.length ? (
                        ""
                    ) : (
                        <div className="flex flex-col gap-2 w-full">
                            {groups.map((g: Group) => (
                                <ParticipantGroup
                                    key={g.id}
                                    group={g}
                                ></ParticipantGroup>
                            ))}
                        </div>
                    )}
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}
