import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Nav";
import AccessProviderWrapper from "@/lib/providers";
import BodyContainer from "@/components/BodyContainer";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dansk Bridgeforbund Booking",
    description: "Tilmeld dig til DBF's mange spændende arrangementer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link
  rel="icon"
  href="/fav.svg"
  type="image"
  sizes="any"
/>
            <AccessProviderWrapper>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased flex place-content-between flex-col`}
                >
                    <div>
                        <Navbar></Navbar>
                        <BodyContainer>{children}</BodyContainer>
                    </div>

                    <Footer>
                    </Footer>
                </body>
            </AccessProviderWrapper>
        </html>
    );
}
