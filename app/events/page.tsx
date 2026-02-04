import EventSearchLoader from "@/components/EventSearchLoader";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchBar from "@/components/SearchBar";
import Hr from "@/components/text/Hr";
import PageHeading from "@/components/text/PageHeading";
import TextBlock from "@/components/text/TextBlock";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Begivenheder | DBF Booking",
    description: "Tilmeld dig til DBF's mange spændende arrangementer",
};

export default async function Page(props: {
    searchParams?: Promise<{
        searchTerm?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const searchTerm = searchParams?.searchTerm || "";
    return (
        <div>
            <PageHeading>Arrangementer & billetsalg</PageHeading>
            <TextBlock>
                <p>
                    Velkommen til Danmarks Bridgeforbund&apos;s site for tilmelding
                    til turneringer, kurser og Bridgefestival.
                </p>
                <Hr />
                <SearchBar></SearchBar>
                <Suspense fallback={<LoadingSpinner />} key={searchTerm}>
                    <EventSearchLoader
                        searchTerm={searchTerm}
                    ></EventSearchLoader>
                </Suspense>
            </TextBlock>
        </div>
    );
}
