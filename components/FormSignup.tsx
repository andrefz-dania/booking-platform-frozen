"use client"
import { KeyRoundIcon, LoaderCircle, MailIcon, MapIcon, UserIcon, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "./ui/input-group";
import { useActionState } from "react";
import { signUp } from "@/lib/requests.server";
import FormErrorMessage from "./FormErrorMessage";
import { FieldLabel } from "./ui/field";

export default function FormSignup() {

    // signup signup request to the API
   const [state, action, pending] = useActionState(signUp, {})


    return (
        <form
            className="flex flex-col max-w-xl mx-auto gap-4 border p-8 rounded-2xl shadow-md mt-16"
            action={action}
        >

            
            <div className="w-full flex flex-row gap-4"> 
            <UserPlus strokeWidth={3} size={32} className="text-primary"/><h1 className="text-center text-2xl font-bold text-primary mb-4">Ny Bruger</h1>
            </div>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <InputGroup>
                <InputGroupInput defaultValue={state.email} id="email" name="email" placeholder="Email addresse" aria-invalid={!!state.validationErrors?.email}/>
                <InputGroupAddon>
                    <MailIcon />
                </InputGroupAddon>
            </InputGroup>
            {state.validationErrors?.email && <FormErrorMessage message={state.validationErrors?.email.toString()}></FormErrorMessage>}


            <InputGroup>
                <InputGroupInput
                    defaultValue={state.password}
                    id="password"
                    type="password"
                    placeholder="Kodeord"
                    name="password"
                    aria-invalid={!!state.validationErrors?.password}
                />
                <InputGroupAddon>
                    <KeyRoundIcon />
                </InputGroupAddon>
            </InputGroup>
            {state.validationErrors?.password && <FormErrorMessage message={state.validationErrors?.password.toString()}></FormErrorMessage>}

            <InputGroup className="mt-8">
                <InputGroupInput defaultValue={state.memberNo} id="memberNo" name="memberNo" placeholder="Medlemsnummer" aria-invalid={!!state.validationErrors?.memberNo}/>
                <InputGroupAddon>
                    <UserIcon />
                </InputGroupAddon>
            </InputGroup>
            {state.validationErrors?.memberNo && <FormErrorMessage message={state.validationErrors?.memberNo.toString()}></FormErrorMessage>}
            
            <InputGroup>
                <InputGroupInput defaultValue={state.postCode} id="postCode" name="postCode" placeholder="Postnummer" aria-invalid={!!state.validationErrors?.postCode}/>
                <InputGroupAddon>
                    <MapIcon />
                </InputGroupAddon>
            </InputGroup>
            {state.validationErrors?.postCode && <FormErrorMessage message={state.validationErrors?.postCode.toString()}></FormErrorMessage>}


            <div className="flex flex-row gap-4 place-content-around">
                <div className="flex w-full place-content-center">
                    <Button className="w-full" type="submit" disabled={pending}>
                    {pending ? <LoaderCircle className="animate-spin"/> : "Opret ny bruger"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
