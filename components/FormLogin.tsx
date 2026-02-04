"use client";
import { KeyRoundIcon, LoaderCircle, MailIcon, ShieldIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "./ui/input-group";
import { useState } from "react";
import { login } from "@/lib/requests.client";
import { redirect } from "next/navigation";
import FormErrorMessage from "./FormErrorMessage";
import { useToken } from "@/lib/providers";
import { FormLoginErrors } from "@/types/types";

export default function FormLogin() {
    const [formErrors, setFormErrors] = useState<FormLoginErrors>({});
    const tokenHandler = useToken();
    const [isLoading, setIsLoading] = useState(false);

    // submit login request to the API
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true);
        e.preventDefault();

        // extract data from form
        const formData = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        const loginFailureErrors: FormLoginErrors = {
            email: "Forkert email addresse eller kode",
            password: "Forkert email addresse eller kode"
        }

        
        login(formData.email, formData.password)
            .then(response => {
                if (response.ok) {
                    return response
                }
                else {
                    setFormErrors(loginFailureErrors);
                    setIsLoading(false);
                    return response
                }
            })
            .then(response => response.json()).then(r => {
                if (r.accessToken && tokenHandler) {
                    tokenHandler.setToken(r.accessToken)
                    console.log(tokenHandler.token)
                    redirect("/profile")
                } else {
                    console.log("no token")
                }
                
            })
    }

    const clearErrors = () => {
        setFormErrors({});
    }

    return (
        <form
            className="flex flex-col max-w-xl mx-auto gap-4 border p-8 rounded-2xl shadow-md mt-16"
            onSubmit={handleSubmit}
            onChange={clearErrors}
        >
            <div className="w-full flex flex-row gap-4"> 
            <ShieldIcon strokeWidth={3} size={32} className="text-primary"/><h1 className="text-center text-2xl font-bold text-primary mb-4">Log på</h1>

            </div>
            <InputGroup>
                <InputGroupInput id="email" placeholder="Email addresse" aria-invalid={!!formErrors.email}/>
                <InputGroupAddon>
                    <MailIcon />
                </InputGroupAddon>
            </InputGroup>

            <InputGroup>
                <InputGroupInput
                    id="password"
                    type="password"
                    placeholder="Kodeord"
                    aria-invalid={!!formErrors.password}
                />
                <InputGroupAddon>
                    <KeyRoundIcon />
                </InputGroupAddon>
            </InputGroup>
            <FormErrorMessage message={formErrors.password} fillSpace></FormErrorMessage>


            <div className="flex flex-row gap-4 place-content-around">
                <div className="flex w-full place-content-center">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? <LoaderCircle className="animate-spin"/> : "Log På"}
                    </Button>
                </div>
                <div className="flex w-full place-content-center">
                    <Button className="w-full" variant="outline" type="reset" onClick={clearErrors}>
                        Ryd felter
                    </Button>
                </div>
            </div>
        </form>
    );
}
