export type jwtUserType = {
    userId: string;
    isAdmin: boolean;
    isCreator: boolean;
};

export type userData = {
    userId?: string;
    isAdmin: boolean;
}

export type FormSignupErrors = {
    email?: string;
    password?: string;
    postCode?: string;
    memberNo?: string;
};

export type FormLoginErrors = {
    email?: string;
    password?: string;
}

export type FormEventErrors = {
    title?: string;
    shortDescription?: string;
    description?: string;
    imageURL?: string;
    price?: string;

    maxSignups?: string;
    groupSize?: string;

    eventStart?: string;
    eventEnd?: string;
    signupDeadline?: string;

    locationName?: string;
    address?: string;
    addressPostCode?: string;
    addressCity?: string;
    contactInfo?: string;
    prevData?: EventTypeOptional;
};

export type EventType = {
    id?: number;
    title: string;
    shortDescription?: string;
    description?: string;
    imageURL?: string;

    creator?: number;
    price: number;
    maxSignups?: number;
    groupSize?: number;

    eventStart: string;
    eventEnd?: string;
    createdAt?: string;
    signupDeadline: string;

    locationName?: string;
    address: string;
    addressPostCode?: string;
    addressCity: string;

    contactInfo?: string;
};

export type EventTypeOptional = {
    id?: number;
    title?: string;
    shortDescription?: string;
    description?: string;
    imageURL?: string;

    creator?: number;
    price?: number;
    maxSignups?: number;
    groupSize?: number;

    eventStart?: string;
    eventEnd?: string;
    createdAt?: string;
    signupDeadline?: string;

    locationName?: string;
    address?: string;
    addressPostCode?: string;
    addressCity?: string;

    contactInfo?: string;
};

export type FormJoinGroupData = {
    groupName: string | null;
    groupLeader: string | null;
}

export type FormJoinGroupErrors = {
    groupName?: string;
    groupLeader?: string;
}

export type FormJoinPersonData = {
        firstName: string;
        lastName: string;
        memberNo?: string;
        postCode?: string;
}

export type FormJoinPersonErrors = {
    firstName?: string;
    lastName?: string;
    memberNo?: string;
    postCode?: string;
}

export type FormJoinValidationErrors = {
    groupErrors: FormJoinGroupErrors;
    personErrors: FormJoinPersonErrors[];
}

export type StepType = {
    id: number;
    title: string;
};

export type ProfileData = {
    id: string | number;
    memberNo: string | number;
    email: string;
    postCode: string | number;
    isAdmin: boolean;
    createdAt: string | number;
    firstName: string;
    lastName: string;
}

export type Person = { firstName: string; lastName: string };
export type Group = {
    id: string;
    groupName: string | null;
    groupLeader: string | null;
    participants: Person[];
};

export type BookingInfo = {
    id: number;
    eventId: number;
    paid: boolean;
    eventTitle: string;
}