import { BookingInfo, EventType, FormJoinGroupData, FormJoinPersonData } from "@/types/types";

export async function login(email: string, password: string) {
    const url = "/api/auth/login";
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return result;
}

export async function logout(token: string | null) {
    const url = "/api/auth/logout";
    fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function deleteEvent(id: number, token: string | null) {
    const url = "/api/event/" + id.toString();
    const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
}

export async function createEvent(event: EventType, token: string | null) {
    const url = "/api/event/create";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
    });
    return response;
}

export async function joinEvent(joinData: {groupFormData?: FormJoinGroupData, participants: FormJoinPersonData[]}, eventId: number, token?: string | null ) {
    const url = "/api/event/join/" + eventId.toString();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(joinData),
    });
    const data = await response.json();
    return data;

}

export async function getUserData(memberNo: number, token: string | null) {
    if (!token) {
        return [];
    }
    const url = "/api/auth/user-data/" + memberNo.toString();
    const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;

}

export async function getProfile(token: string | null) {
    if (!token) {
        return [];
    }
    const url = "/api/auth/profile/"
    const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data;


}

export async function getBookingStatus(token: string | null) {
    if (!token) {
        return [];
    }
    const url = "/api/payment/status"
    const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data as BookingInfo[];

}