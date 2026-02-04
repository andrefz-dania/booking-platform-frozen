"use client"
import {
    AsteriskIcon,
    ClockIcon,
    InfoIcon,
    LoaderCircle,
    MapIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupTextarea,
} from "./ui/input-group";
import { useState } from "react";
import { EventType, FormEventErrors } from "@/types/types";
import FormErrorMessage from "./FormErrorMessage";
import { useToken } from "@/lib/providers";
import { FieldLabel } from "./ui/field";
import { createEvent } from "@/lib/requests.client";
import { redirect } from "next/navigation";

export default function FormCreateEvent() {
    const [formErrors, setFormErrors] = useState<FormEventErrors>({});
    const tokenHandler = useToken();
    const [pending, setPending] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setPending(true);

        // convert time format to MSSQL DATETIME2 compatible
        const startTime = e.currentTarget.eventStartDate.value + "T" + e.currentTarget.eventStartTime.value + ":00.000Z";
        const endTime = e.currentTarget.eventEndDate.value + "T" + e.currentTarget.eventEndTime.value + ":00.000Z"
        const signupDeadline = e.currentTarget.signupDeadlineDate.value + "T" + e.currentTarget.signupDeadlineTime.value + ":00.000Z";
        const noEndTime = e.currentTarget.eventEndDate.value.length <= 1 ? true : false;

        // extract formdata and apply changes
        const formData: EventType = {
            title: e.currentTarget.eventTitle.value,
            description: e.currentTarget.description.value || null,
            shortDescription: e.currentTarget.shortDescription.value || null,
            contactInfo: e.currentTarget.contactInfo.value || null,

            maxSignups: e.currentTarget.maxSignups.value || null,
            groupSize: e.currentTarget.groupSize.value || null,
            price: e.currentTarget.price.value,

            eventStart: startTime,
            eventEnd: noEndTime ? undefined : endTime,
            signupDeadline: signupDeadline,

            locationName: e.currentTarget.locationName.value || null,
            address: e.currentTarget.address.value,
            addressPostCode: e.currentTarget.addressPostCode.value || null,
            addressCity: e.currentTarget.addressCity.value || null,

        }
        if (!tokenHandler.token) {
            tokenHandler.refreshToken();
        }

        const response = await createEvent(formData, tokenHandler.token);
        if (response.status == 400) {
            const data = await response.json()
            setFormErrors(data);
            setPending(false);
        }
        if (response.ok) {
            const data = await response.json()
            if (data.createdId) {
                setPending(false)
                redirect(`/events/${data.createdId}`)
            } else {
                setPending(false);
            }
        } else {
            setPending(false)
        }        
    }

    if (pending)  {
        return (
            <div className="mx-auto w-fit">
            <p className="text-primary font-bold text-lg my-8">Opretter...</p>
           <LoaderCircle size={256} className="text-primary animate-spin"></LoaderCircle>
        </div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col mx-auto gap-2 ">
                <div className="w-full flex flex-row gap-4">
                    <InfoIcon
                        strokeWidth={3}
                        size={32}
                        className="text-primary"
                    />
                    <h2 className="text-center text-2xl font-bold text-primary mb-4">
                        Om begivenheden
                    </h2>
                </div>
                <FieldLabel htmlFor="eventTitle">Titel</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="eventTitle"
                        placeholder="Begivenhedens navn"
                        type="text"
                        defaultValue={formErrors?.prevData?.title ?? undefined}
                        aria-invalid={formErrors && formErrors.title ? "true" : false}
                        required
                    />
                    <InputGroupAddon
                        align="inline-end"
                        className="text-destructive"
                    >
                        <AsteriskIcon />
                    </InputGroupAddon>
                </InputGroup>

                <FormErrorMessage message={formErrors && formErrors.title}></FormErrorMessage>

                <FieldLabel htmlFor="shortDescription">Beskrivelse</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="shortDescription"
                        placeholder="Kort beskrivelse"
                        type="text"
                        defaultValue={formErrors?.prevData?.shortDescription ?? undefined}

                        aria-invalid={formErrors && formErrors.shortDescription ? "true" : false}
                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.shortDescription}
                ></FormErrorMessage>

                <InputGroup className="h-auto">
                    <InputGroupTextarea
                        id="description"
                        placeholder="Uddybende beskrivelse"
                        defaultValue={formErrors?.prevData?.description ?? undefined}

                        aria-invalid={formErrors && formErrors.description ? "true" : false}
                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.description}
                ></FormErrorMessage>

                <FieldLabel htmlFor="maxSignups">
                    Max antal deltagere
                </FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="maxSignups"
                        placeholder="Blank for intet maximum"
                        type="number"
                        defaultValue={formErrors?.prevData?.maxSignups ?? undefined}

                        aria-invalid={formErrors && formErrors.maxSignups ? "true" : false}

                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.maxSignups}
                ></FormErrorMessage>

                <FieldLabel htmlFor="groupSize">
                    Antal deltagere pr. gruppe
                </FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="groupSize"
                        placeholder="1"
                        type="number"
                        defaultValue={formErrors?.prevData?.groupSize ?? undefined}

                        aria-invalid={formErrors && formErrors.groupSize ? "true" : false}

                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.groupSize}
                ></FormErrorMessage>

                <FieldLabel htmlFor="contactInfo">
                    Kontaktinformation
                </FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="contactInfo"
                        placeholder="evt. E-mail og/eller telefon"
                        type="text"
                        defaultValue={formErrors?.prevData?.contactInfo ?? undefined}

                        aria-invalid={formErrors && formErrors.contactInfo ? "true" : false}

                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.contactInfo}
                ></FormErrorMessage>

                <FieldLabel htmlFor="price">Pris</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="price"
                        placeholder="Pris"
                        type="number"
                        defaultValue={formErrors?.prevData?.price ?? undefined}
                        aria-invalid={formErrors && formErrors.price ? "true" : false}

                        required
                    />
                    <InputGroupAddon align="inline-end">DKK</InputGroupAddon>
                    <InputGroupAddon
                        align="inline-end"
                        className="text-destructive"
                    >
                        <AsteriskIcon />
                    </InputGroupAddon>
                </InputGroup>

                <FormErrorMessage message={formErrors && formErrors.price}></FormErrorMessage>
            </div>
            <div className="flex flex-col mx-auto gap-2 mt-8 ">
                <div className="w-full flex flex-row gap-4">
                    <ClockIcon
                        strokeWidth={3}
                        size={32}
                        className="text-primary"
                    />
                    <h2 className="text-center text-2xl font-bold text-primary mb-4">
                        Tidspunkter
                    </h2>
                </div>

                <FieldLabel htmlFor="eventStart">Start</FieldLabel>
                <div className="flex flex-row gap-2">
                    <InputGroup>
                        <p className="text-sm text-muted-foreground px-2">
                            Dato:
                        </p>
                        <InputGroupInput
                            id="eventStartDate"
                            placeholder="dd/mm/yyyy"
                            type="date"


                            aria-invalid={formErrors && formErrors.eventStart ? "true" : false}

                            required
                        />
                        <p className="text-sm text-muted-foreground px-2">
                            Tid:
                        </p>

                        <InputGroupInput
                            id="eventStartTime"
                            placeholder="12:00"
                            defaultValue={"12:00"}
                            type="time"
                            aria-invalid={formErrors && formErrors.eventStart ? "true" : false}

                            required
                        />
                        <InputGroupAddon
                            align="inline-end"
                            className="text-destructive"
                        >
                            <AsteriskIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <FormErrorMessage
                    message={formErrors && formErrors.eventStart}
                ></FormErrorMessage>

                <FieldLabel htmlFor="eventEnd">Slut</FieldLabel>
                <div className="flex flex-row gap-2">
                    <InputGroup>
                        <p className="text-sm text-muted-foreground px-2">
                            Dato:
                        </p>
                        <InputGroupInput
                            id="eventEndDate"
                            placeholder="dd/mm/yyyy"
                            type="date"

                            aria-invalid={formErrors && formErrors.eventEnd ? "true" : false}

                        />
                        <p className="text-sm text-muted-foreground px-2">
                            Tid:
                        </p>

                        <InputGroupInput
                            id="eventEndTime"
                            type="time"

                            aria-invalid={formErrors && formErrors.eventEnd ? "true" : false}

                        />
                    </InputGroup>
                </div>

                <FormErrorMessage
                    message={formErrors && formErrors.eventEnd}
                ></FormErrorMessage>

                <FieldLabel htmlFor="signupDeadline">
                    Tilmeldingsfrist
                </FieldLabel>
                <div className="flex flex-row gap-2">
                    <InputGroup>
                        <p className="text-sm text-muted-foreground px-2">
                            Dato:
                        </p>
                        <InputGroupInput
                            id="signupDeadlineDate"
                            placeholder="dd/mm/yyyy"
                            type="date"

                            aria-invalid={formErrors && formErrors.signupDeadline ? "true" : false}

                            required
                        />
                        <p className="text-sm text-muted-foreground px-2">
                            Tid:
                        </p>

                        <InputGroupInput
                            id="signupDeadlineTime"
                            placeholder="12:00"
                            type="time"
                            defaultValue={"12:00"}
                            aria-invalid={formErrors && formErrors.signupDeadline ? "true" : false}

                            required
                        />
                        <InputGroupAddon
                            align="inline-end"
                            className="text-destructive"
                        >
                            <AsteriskIcon />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <FormErrorMessage
                    message={formErrors && formErrors.signupDeadline}
                ></FormErrorMessage>
            </div>

            <div className="flex flex-col mx-auto gap-2 mt-8 ">
                <div className="w-full flex flex-row gap-4">
                    <MapIcon
                        strokeWidth={3}
                        size={32}
                        className="text-primary"
                    />
                    <h2 className="text-center text-2xl font-bold text-primary mb-4">
                        Sted
                    </h2>
                </div>

                <FieldLabel htmlFor="locationName">Titel</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="locationName"
                        placeholder="Område eller bygnings navn, fx. 'Sportshal 2'"
                        type="text"
                        defaultValue={formErrors?.prevData?.locationName ?? undefined}
                        aria-invalid={formErrors && formErrors.locationName ? "true" : false}

                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.locationName}
                ></FormErrorMessage>

                <FieldLabel htmlFor="address">Addresse</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="address"
                        placeholder="Vejnavn, nummer, sal osv."
                        type="text"
                        defaultValue={formErrors?.prevData?.address ?? undefined}
                        aria-invalid={formErrors && formErrors.address ? "true" : false}

                        required
                    />
                    <InputGroupAddon
                        align="inline-end"
                        className="text-destructive"
                    >
                        <AsteriskIcon />
                    </InputGroupAddon>
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.address}
                ></FormErrorMessage>

                <FieldLabel htmlFor="addressPostCode">Postnummer</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="addressPostCode"
                        placeholder="fx. 8000"
                        type="text"
                        defaultValue={formErrors?.prevData?.addressPostCode ?? undefined}
                        aria-invalid={formErrors && formErrors.addressPostCode ? "true" : false}

                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.addressPostCode}
                ></FormErrorMessage>

                <FieldLabel htmlFor="addressCity">By</FieldLabel>
                <InputGroup>
                    <InputGroupInput
                        id="addressCity"
                        placeholder="fx. Aarhus"
                        type="text"
                        defaultValue={formErrors?.prevData?.addressCity ?? undefined}
                        aria-invalid={formErrors && formErrors.addressCity ? "true" : false}

                    />
                </InputGroup>

                <FormErrorMessage
                    message={formErrors && formErrors.addressCity}
                ></FormErrorMessage>
            </div>

            <div className="flex flex-row gap-4 w-full mb-24 mt-8 place-content-center">
                <div className="flex w-full max-w-sm place-content-center">
                    <Button className="w-full" type="submit">
                        Opret
                    </Button>
                </div>
                <div className="flex w-full max-w-sm place-content-center">
                    <Button className="w-full" variant="outline" type="reset">
                        Ryd felter
                    </Button>
                </div>
            </div>
        </form>
    );
}




