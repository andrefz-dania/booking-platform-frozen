"use client";

import Link from "next/link";

import { useIsMobile } from "@/hooks/isMobile";
import {
    navIcon,
    navIconAlt,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    navigationMenuTriggerStyleAlt,
    navigationMenuTriggerStyleAltTransparent,
    navigationMenuTriggerStyleTransparent,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useToken } from "@/lib/providers";
import { usePathname } from "next/navigation";
import { CircleUserRound, LogOutIcon, UserRound } from "lucide-react";

export function Navbar() {
    const isMobile = useIsMobile();
    const { token, userData } = useToken();
    let components: { title: string; href: string; description: string }[] = [];

    // check if current page is the root page
    const path = usePathname();
    const isFrontPage = path === "/";

    if (!token) {
        components = [
            {
                title: "Hjem",
                href: "/",
                description: "Tilbage til forsiden",
            },
            {
                title: "Begivenheder",
                href: "/events",
                description:
                    "Se en liste over kommende begivenheder, og tilmeld dig",
            },
        ];
    } else {
        components = [
            {
                title: "Hjem",
                href: "/",
                description: "Tilbage til forsiden",
            },
            {
                title: "Begivenheder",
                href: "/events",
                description:
                    "Se en liste over kommende begivenheder, og tilmeld dig",
            },
        ];
    }

    const signupComponent = {
        title: "Ny bruger",
        href: "/signup",
        description: "Registrer dig som en ny bruger",
    };

    const createComponent = {
        title: "Opret begivenhed",
        href: "/events/create",
        description: "Opret en ny begivenhed som en administrator",
    };

    return (
        <NavigationMenu
            viewport={isMobile}
            className={`w-full z-20 fade-in shadow-md ${
                isFrontPage ? "shadow-none" : "shadow-md"
            }`}
        >
            <div className="w-full max-w-6xl flex place-content-between items-center px-4 shadow-none">
                <Link href="/">
                    <Image
                        src={isFrontPage ? "/logo-dark.svg" : "/logo-light.svg"}
                        alt="Logo"
                        width={96}
                        height={96}
                    ></Image>
                </Link>

                <NavigationMenuList className="flex-wrap gap-4 py-4">
                    {components.map((component) => (
                        <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                        ></ListItem>
                    ))}

                    {!token && (
                        <ListItem
                            title={signupComponent.title}
                            href={signupComponent.href}
                        ></ListItem>
                    )}

                    {token && userData?.isAdmin == true && (
                        <ListItem
                            title={createComponent.title}
                            href={createComponent.href}
                        ></ListItem>
                    )}

                    {!token ? (
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                asChild
                                className={
                                    isFrontPage
                                        ? navigationMenuTriggerStyleAltTransparent()
                                        : navigationMenuTriggerStyleAlt()
                                }
                            >
                                <Link href="/login">Log På</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem
                            className={isFrontPage ? navIconAlt() : navIcon()}
                        >
                            <NavigationMenuTrigger>
                                <UserRound className="min-h-8 min-w-8 text-white"></UserRound>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="overflow-hidden w-screen md:w-auto md:min-w-42 font-bold">
                                <ul>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink
                                            asChild
                                            className="bg-transparent text-primary text-lg"
                                        >
                                            <Link href={"/profile"}>
                                                <span className="flex flex-row gap-2 items-center">
                                                    <CircleUserRound className="min-h-6 min-w-6 text-primary"></CircleUserRound>
                                                    Profil
                                                </span>
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink
                                            asChild
                                            className="bg-transparent text-primary text-lg"
                                        >
                                            <Link href={"/logout"}>
                                                <span className="flex flex-row gap-2 items-center">
                                                    <LogOutIcon className="min-h-6 min-w-6 text-primary"></LogOutIcon>
                                                    Log ud
                                                </span>
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </ul>
                            </NavigationMenuContent>
                            {/* <NavigationMenuLink
                            asChild
                            className={isFrontPage ? navIconAlt() : navIcon()}
                        >
                            <Link href="/profile"><UserRound className="min-h-8 min-w-8 text-white"></UserRound></Link>
                        </NavigationMenuLink> */}
                        </NavigationMenuItem>
                    )}
                </NavigationMenuList>
            </div>
        </NavigationMenu>
    );
}

function ListItem({ title, href, ...props }: { title: string; href: string }) {
    // check if current page is the root page
    const path = usePathname();
    const isFrontPage = path === "/";
    return (
        <NavigationMenuItem {...props}>
            <NavigationMenuLink
                asChild
                className={
                    isFrontPage
                        ? navigationMenuTriggerStyleTransparent()
                        : navigationMenuTriggerStyle()
                }
            >
                <Link href={href}>{title}</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
}
