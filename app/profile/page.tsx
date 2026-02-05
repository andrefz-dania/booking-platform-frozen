"use client";

import Bookings from "@/components/BookingInfo";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import { useToken } from "@/lib/providers";
import { getBookingStatus, getProfile } from "@/lib/requests.client";
import { BookingInfo, ProfileData } from "@/types/types";
import { CalendarIcon, CircleUserRound, IdCardIcon, MailIcon, MapIcon, ShieldIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Profile() {
    const tokenHandler = useToken()
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<ProfileData | null>(null)
    const [bookingInfo, setBookingInfo] = useState<BookingInfo[] | undefined>(undefined)

  

    function getData() {
        if (!loading) {
           return;
        }
        getProfile(tokenHandler.token)
        .then(u=>{
            setUser(u);
            setLoading(false);
        })
        getBookingStatus(tokenHandler.token)
        .then(b => {
            console.log(b)
            if (b) setBookingInfo(b)
        })


    }

    useEffect(() => {
        getData();
    }, [])

    if (loading) {
        return (<LoadingSpinner></LoadingSpinner>)
    }


    return (<div>

   
        <Card className="mt-16 flex flex-col gap-8 p-8 items-center place-content-center text-center max-w-md mx-auto w-full">
            {user && <>
            <CardHeader className="text-primary text-xl w-full flex flex-col place-content-center">
                <CircleUserRound className="scale-200 mx-auto m-4"></CircleUserRound>
                <CardTitle className="mx-auto capitalize">{user.firstName} {user.lastName}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 place-content-center">
                <div className="flex flex-row gap-2 place-content-center">
                    <IdCardIcon />
                    <p className="font-bold">Medlemsnummer: </p>
                    <p>{user.memberNo}</p>
                </div>
                <div className="flex flex-row gap-2 place-content-center">
                    <MailIcon></MailIcon>
                    <p className="font-bold">E-mail: </p>

                    <p>{user.email}</p>
                </div>
                <div className="flex flex-row gap-2 place-content-center">
                    <MapIcon />
                    <p className="font-bold">Postnummer: </p>

                    <p>{user.postCode}</p>
                </div>

                <div className="flex flex-row gap-2 place-content-center mt-4">
                    <ShieldIcon />
                    <p className="font-bold">Rolle: </p>

                    <p>{user.isAdmin ? "Administrator" : "Bruger"}</p>
                </div>

                <div className="flex flex-row gap-2 place-content-center">
                    <CalendarIcon />
                    <p className="font-bold">Medlem fra: </p>

                    <p>{user.createdAt && formatDate(new Date(user.createdAt.toString()))}</p>
                </div>

            </CardContent>
            </>
            }
            <Link className="w-full mx-auto max-w-xs" href="/logout">
                <Button className="w-full">Log ud</Button>
                </Link>
        </Card>
        <Bookings bookingInfo={bookingInfo}></Bookings>
        </div>
    );
}
