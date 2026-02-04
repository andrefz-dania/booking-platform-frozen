"use client";
import { Edit2Icon, LockIcon, TrashIcon } from "lucide-react";
import { Card } from "./ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { deleteEvent } from "@/lib/requests.client";
import { useToken } from "@/lib/providers";
import { redirect } from "next/navigation";

export default function AdminControls({id}: {id?: number}) {

    const tokenHandler = useToken()

    const handleDelete = ()=> {
        if (id) {
            deleteEvent(id, tokenHandler.token).then(r => {
                if (r.ok) {
                    redirect("/events")
                } else {
                    // should only appear if a user is not admin, but forces the admin UI to show by editing client side code
                    alert("delete failed")
                }
            })
        }
    }

    // only show control bar if user is admin.
    if (!tokenHandler.userData?.isAdmin) { return null }

    return (
        <Card className="flex flex-row p-4 mt-4 place-content-between items-center">
            <p className="text-lg font-bold text-primary flex flex-row gap-2">
                <LockIcon strokeWidth={3} />
                Administration
            </p>
            <div className="flex flex-row flex-wrap gap-2">
                <Button variant={"default"}>
                    <Edit2Icon />
                    Rediger
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"destructive"}>
                            <TrashIcon />
                            Slet
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Er du sikker på at du vil slette denne
                                begivenhed
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Begivenheden slettes fra denne side og kan ikke
                                længere tilgås af brugere. Den kan kun gendannes
                                af en database administrator.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <form action={handleDelete}>

                            <AlertDialogAction variant={"destructive"} type="submit">
                                <TrashIcon />
                                Slet
                            </AlertDialogAction>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Card>
    );
}
