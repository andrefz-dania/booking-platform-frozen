"use client";
import { useToken } from "@/lib/providers"
import { logout } from "@/lib/requests.client";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const tokenHandler = useToken()


    useEffect(()=> {
        logout(null);
        tokenHandler.setToken(null);
        redirect("/");
    }, [])

    return (
        <div className="mx-auto w-fit">
            <p className="text-primary font-bold text-lg my-8">Logger ud...</p>
           <LoaderCircle size={256} className="text-primary animate-spin"></LoaderCircle>
        </div>
    )
}