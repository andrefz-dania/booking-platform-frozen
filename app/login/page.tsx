import FormLogin from "@/components/FormLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log på | DBF Booking",
  description: "Tilmeld dig til DBF's mange spændende arrangementer",
};

export default function Home() {
    return (
      <div>
        <FormLogin></FormLogin>
        
        
      </div>
    );
  }
  