import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({size} : { size?: number }) {
    return (<LoaderCircle size={size ?? 200} className="text-primary animate-spin mx-auto my-8"></LoaderCircle>)
    
}