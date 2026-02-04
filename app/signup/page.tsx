
import FormSignup from "@/components/FormSignup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ny Bruger | DBF Booking",
  description: "Tilmeld dig til DBF's mange spændende arrangementer",
};
export default function Home() {
    return (
      <div>
        <FormSignup/>
      </div>
    );
  }
  