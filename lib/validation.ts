import { EventType, FormEventErrors, FormJoinGroupData, FormJoinPersonData, FormJoinValidationErrors } from "@/types/types";

export function validateEmail(email: string) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
}

export function validatePostcode(postCode: number) {
    if (typeof postCode == "string") {
        return false;
    }
    if (postCode < 1 || postCode > 9999) return false;
    return true;
}

export function validateDate(dateStr: string) {
    return !isNaN(new Date(dateStr).getTime());
}

export function validateEvent(newEvent: EventType) {
    const validationErrors: FormEventErrors = {};
    // title validation
    if (!newEvent.title) validationErrors.title = "Titel er påkrævet";
    if (newEvent.title && newEvent.title.length > 120)
        validationErrors.title = "Titel er for lang";

    //description validation
    if (newEvent.shortDescription && newEvent.shortDescription.length > 120)
        validationErrors.shortDescription = "Kort beskrivelse er for lang";

    // address validation
    if (!newEvent.address) validationErrors.address = "Addresse er påkrævet";
    if (newEvent.address.length > 250)
        validationErrors.address = "Addresse er for lang";
    if (newEvent.locationName && newEvent.locationName.length > 120)
        validationErrors.locationName = "Navn på sted er for langt";
    if (newEvent.addressPostCode && newEvent.addressPostCode.length > 4)
        validationErrors.addressPostCode = "Postnummer må kun være 4 cifre";

    // date validation
    if (!newEvent.eventStart)
        validationErrors.eventStart = "Start tidspunkt er påkrævet";
    if (!validateDate(newEvent.eventStart))
        validationErrors.eventStart = "Ugyldigt tidspunkt";
    if (newEvent.eventEnd && !validateDate(newEvent.eventEnd))
        validationErrors.eventEnd = "Ugyldigt tidspunkt";
    if (!newEvent.signupDeadline)
        validationErrors.signupDeadline = "Tilmeldingsfrist er påkrævet";
    if (!validateDate(newEvent.signupDeadline))
        validationErrors.signupDeadline = "Ugyldigt tidspunkt";

    // price validation
    if (!newEvent.price) validationErrors.price = "Pris er påkrævet";
    if (newEvent.price && isNaN(Number(newEvent.price))) validationErrors.price = "Prisen skal være et tal";
    if (newEvent.price && newEvent.price < 0) validationErrors.price = "Pris må ikke være negativ"

    //maximum signups validation
    if (newEvent.maxSignups && isNaN(Number(newEvent.maxSignups))) validationErrors.maxSignups = "Maximum deltagere skal være et tal eller blank";

    //group size validation
    if (newEvent.groupSize && isNaN(Number(newEvent.groupSize)))
        validationErrors.groupSize = "Gruppe størrelse skal være et tal eller blank";
    if (newEvent.groupSize && newEvent.maxSignups && newEvent.maxSignups < newEvent.groupSize)
        validationErrors.groupSize = "Gruppe størrelse må ikke være større end maximum deltagere";

    return validationErrors;
}


export async function validateJoin(joinData: {groupFormData: FormJoinGroupData, participants: FormJoinPersonData[]}) {
    const validationErrors: FormJoinValidationErrors = {
            groupErrors: {},
            personErrors: []
        };


    
    // ensure either both or no fields are filled for group data
    if (joinData.groupFormData.groupName && !joinData.groupFormData.groupLeader) {
        validationErrors.groupErrors.groupLeader = "Holdet skal have en leder"
    }

    if (!joinData.groupFormData.groupName && joinData.groupFormData.groupLeader) {
        validationErrors.groupErrors.groupName = "Holdet skal have et navn"
    }

    //ensure that participants field exists before proceeding
    if (!joinData.participants || !joinData.participants.length) {
        validationErrors.personErrors.push({firstName: "Mindst en deltager er påkrævet"})
        return validationErrors;
    }

    // check that all participants have both first and last names
    joinData.participants.forEach((person, index) => {
        if (index > validationErrors.personErrors.length -1) validationErrors.personErrors.push({});
        if (!person.firstName) validationErrors.personErrors[index].firstName = "Navn er påkrævet";
        if (!person.lastName) validationErrors.personErrors[index].lastName = "Efternavn er påkrævet";
        
    });

    // if there are no errors on any participants, clear the array of empty objects
    const noPersonErrors = validationErrors.personErrors.every(element => {
        return Boolean(element && typeof element === 'object') && !Object.keys(element).length;
      }); 
    if (noPersonErrors == true) {
        validationErrors.personErrors = [];
    }

    return validationErrors;

    }