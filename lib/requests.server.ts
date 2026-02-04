"use server";
import { BASE_URL } from "@/config/constants";
import { FormSignupErrors } from "@/types/types";
import { redirect } from "next/navigation";

export async function createUser(
    email: string,
    password: string,
    memberNo: string,
    postCode: string
) {
    const url = "/api/auth/signup";
    const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, memberNo, postCode }),
    });
    return result;
}

export type SignUpActionState = {
    email?: string;
    password?: string;
    memberNo?: string;
    postCode?: string;
    validationErrors?: FormSignupErrors;
};

export async function signUp(
    _prevState: SignUpActionState,
    formData: FormData
): Promise<SignUpActionState> {

    const userData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        memberNo: formData.get("memberNo") as string,
        postCode: formData.get("postCode") as string,
    }
    const url = BASE_URL + "/api/auth/signup";
    const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    const responseData = await result.json()
    if (result.status === 201) {
        redirect("/login");
    }

    return {...userData, validationErrors: responseData};
}

export async function getEvent(id: number) {
    const url = BASE_URL + "/api/event/" + id.toString();
    const response = await fetch(url, {
        method: "GET",
    });
    return response;
}

export async function searchEvents(searchTerm?: string) {
    let url = "";
    if (!searchTerm) {
        url = BASE_URL + "/api/event";
    } else {
        url = BASE_URL + "/api/event?searchTerm=" + searchTerm;
    }

    const response = await fetch(url, {
        method: "GET",
    });
    return response;
}

export async function getParticpants(eventId: number) {
    const url = BASE_URL + "/api/event/" + eventId.toString() + "/participants";
    const response = await fetch(url, {
        method: "GET",
    });
    const data = await response.json();
    return data;
}