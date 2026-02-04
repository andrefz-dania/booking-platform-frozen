"use client";
import FormCreateEvent from "@/components/FormCreateEvent";
import Hr from "@/components/text/Hr";
import PageHeading from "@/components/text/PageHeading";
import TextBlock from "@/components/text/TextBlock";
import { useToken } from "@/lib/providers";
import { AsteriskIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page() {
    const tokenHandler = useToken()
    if (!tokenHandler.userData?.isAdmin) {
        redirect("/login")
    }
    return (
        <div>
            <PageHeading>Opret ny begivenhed</PageHeading>
            <TextBlock>
                <p>
                    Udfyld de nedenstående felter for at oprette en ny
                    begivenhed. Bemærk at felter markeret med en stjerne <span className="inline-block"><AsteriskIcon size={16} className="text-destructive" /></span> er påkrævet.
                </p>
                <Hr />
                <FormCreateEvent />
            </TextBlock>
        </div>
    )
}