import { FormJoinGroupData, FormJoinPersonData } from "@/types/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChevronLeft, ChevronRight, ListCheck } from "lucide-react";
import { Button } from "../ui/button";

export default function Step3({
    prevStep,
    groupSize,
    groupFormData,
    pFormData,
}: {
    prevStep: () => void;
    groupSize: number;
    groupFormData: FormJoinGroupData;
    pFormData: FormJoinPersonData[];
}) {
    const isGroupEvent = groupSize > 1 ? true : false;

    return (
        <Card className="max-w-xl p-4 mx-auto my-8">
            <CardHeader>
                <div className="w-full flex flex-row gap-4 pt-4">
                    <ListCheck
                        strokeWidth={3}
                        size={32}
                        className="text-primary"
                    />
                    <h3 className="text-center text-2xl font-bold text-primary mb-4">
                        Oversigt
                    </h3>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col">
                <div className="flex flex-col gap-8">
                    <div>
                        {isGroupEvent && <h2 className="font-bold text-primary text-lg mt-2 ">Hold Info</h2>}
                        {isGroupEvent && <h3 className="font-bold text-sm mt-2 ">Navn</h3>}
                        {isGroupEvent && <p>{groupFormData.groupName}</p>}
                        {isGroupEvent && <h3 className="font-bold text-sm mt-2 ">Leder</h3>}
                        {isGroupEvent && <p className="capitalize">{groupFormData.groupLeader}</p>}
                    </div>
                    {[...Array(groupSize).keys()].map(i => <div className="" key={i}>
                        <h2 className="font-bold text-primary text-lg mt-2">Deltager {i+1}</h2>
                        <h3 className="font-bold text-sm mt-2 ">Navn</h3>
                        <p className="capitalize">{pFormData[i]?.firstName || ""} {pFormData[i]?.lastName || ""}</p>

                        <h3 className="font-bold text-sm mt-2 ">Medlemsnummer</h3>
                        <p className="">{pFormData[i]?.memberNo || ""}</p>

                        <h3 className="font-bold text-sm mt-2 ">Postnummer</h3>
                        <p className="">{pFormData[i]?.postCode || ""}</p>
                    </div>)}
                </div>


                <div className="flex flex-row gap-4 place-content-between mt-8">

                    <Button
                        type="button"
                        className="grow"
                        variant={"outline"}
                        onClick={prevStep}
                    >
                        <ChevronLeft></ChevronLeft> Tilbage
                    </Button>
                    <Button
                        type="submit"
                        className="grow"
                    >
                         Til Betaling <ChevronRight></ChevronRight>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}