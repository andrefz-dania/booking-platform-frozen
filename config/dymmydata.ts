import { EventType } from "@/types/types";

export const dummyEvents: EventType[] = [
    {
        id: 1,
        title: "Test Event",
        description: "This is a test event for the Bridgeforbund website.",
        shortDescription: "This is a test event for the Bridgeforbund website.",


        creator: 1,
        price: 50.0,
        maxSignups: 10,
        groupSize: 1,

        eventStart: new Date("2026-01-26T18:00").toISOString(),
        eventEnd: new Date("2026-01-27T04:00").toISOString(),
        createdAt: new Date().toISOString(),
        signupDeadline: new Date("2026-01-26T18:00").toISOString(),

        address: "Test Road 123",
        addressPostCode: "1234",
        addressCity: "Test City",

        contactInfo: "Phone: +45 12345678, Email: test@example.com",
        

    },
    {
        id: 2,
        title: "Bridge/Golf 2026",
        shortDescription: "Bridge/Golf 2026 - i Svendborg under Dansk Bridgefestival.",
        description: "Halv bridge, halv golf - men 200% sjovt. Tilmelding til det uofficielle danmarksmesterskab i Bridge/Golf kræver medlemskab af en DBf-klub. Det koster 2.800 kr. pr. par. OBS - Deltagerbegrænsning - max. 44 par / 88 deltagere.",

        creator: 1,
        price: 2800.00,
        maxSignups: 88,
        groupSize: 2,

        eventStart: new Date("2026-06-03T18:00").toISOString(),
        eventEnd: new Date("2026-06-05T15:00").toISOString(),
        createdAt: new Date().toISOString(),
        signupDeadline: new Date("2026-05-28T23:59").toISOString(),

        locationName: "Svendborg Idrætscenter",
        address: "Ryttervej 70",
        addressPostCode: "5700",
        addressCity: "Svendborg",

        contactInfo: "Phone: +45 12345678, Email: test@example.com"
        

    }
]

export const testAdminUser = {
    id: 5,
    email: "admin@test.dk",
    password: "admin",
    foreignKey: 164404,
}

export const testCreatorUser = {
    id: 6,
    email: "creator@test.dk",
    password: "creator",
    foreignKey: 164405,
}

export const dummyParticipants = {
    
} 