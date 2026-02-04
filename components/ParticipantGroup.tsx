import { Group } from "@/types/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { UserCircle } from "lucide-react";

export default function ParticipantGroup({ group }: { group: Group }) {
    return (
        <Card className="w-full p-4">
            {group.groupName && (
                <CardHeader className="p-0 m-0">
                    <h3 className="text-lg font-bold">{group.groupName}</h3>
                    <p className="text-sm text-muted-foreground -my-2">Leder: {group.groupLeader}</p>
                </CardHeader>
            )}
            <CardContent className="p-0 m-0 flex flex-col gap-2">
                {group.participants &&
                    group.participants.map((p) => {
                        return (
                            <div key={p.firstName + p.lastName} className="flex flex-row gap-2">
                                <UserCircle></UserCircle>
                                <p className="capitalize">{p.firstName + " " + p.lastName}</p>
                                
                            </div>
                        );
                    })}
            </CardContent>
        </Card>
    );
}
