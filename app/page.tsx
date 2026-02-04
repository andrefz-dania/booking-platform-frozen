"use client";
import H1 from "@/components/text/H1";
import { Button } from "@/components/ui/button";
import VideoBackground from "@/components/VideoBackground";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <VideoBackground>
                <h1 className="mb-4 px-4 text-pretty sm:text-5xl text-3xl font-bold py-2 text-white">
                    Tilmelding til turneringer, kurser & Bridgefestival
                </h1>
                <p className="text-white px-4 text-lg">
                    Her kan du tilmelde dig til DBF&apos;s mange turneringer og
                    aktiviteter. Bemærk at det ikke er alle turneringer du kan
                    tilmelde dig på forhånd.
                    <br />
                    <br />
                    Dansk Bridgefestival afholdes næste gang i Svendborg fra 4.
                    – 11. juli 2026.
                    <br />
                    Program og tilmelding til festivalen 2026 åbner mandag 12.
                    januar 2026 kl. 12.00.
                </p>
                <Link href="/events" className="w-fit">
                    <Button className="hover:cursor-pointer px-4" size={"lg"}>
                        Se alle begivenheder
                        <ChevronRight size={12} className="p-0 m-0" />
                    </Button>
                </Link>
            </VideoBackground>

            
            {/* spacer for header video */}
            <div className="md:h-[720px] md:min-h-[720px] h-screen inset-0 -mt-16 bg-transparent -z-20">
            </div>

            {/* add rest of content below header here */}
            <article className="p-4">
                <H1>Om Dansk Bridgefestival</H1>
                <p className="mt-8">
                    Dansk Bridgefestival er for alle bridgespillere – nuværende
                    og kommende. Der arrangeres drop-in turneringer hver dag,
                    DM-finaler, kurser, Begynderfestival og meget mere. <br />
                    <br />
                    Til drop-in turneringerne kan alle deltage, og
                    forhåndstilmelding er ikke nødvendig! Mød blot op, køb din
                    billet i informationen og gå ind og sæt dig – så er du med!
                    Der spilles i styrkeopdelte rækker i alle bronzeturneringer,
                    og vi guider gerne dig/jer til den rigtige række. <br />
                    <br />
                    Hvis du ikke selv har en makker, er det en god idé at være
                    der en halv time i forvejen, så hjælper vi med at finde en,
                    du kan spille med. Alle bronze- og sølvturneringerne er
                    drop-in turneringer, så der er rig lejlighed til at få
                    luftet kortene. <br />
                    <br />
                    DM-finaler, Philipson Wine Open (tidligere Vinoble Open),
                    Begynderfestival samt guldturnering kræver kvalifikation
                    eller forhåndstilmelding. Se under de enkelte aktiviteter,
                    hvordan det foregår.
                </p>
            </article>
        </div>
    );
}
