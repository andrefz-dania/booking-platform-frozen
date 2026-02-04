import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const classes = cva("text-5xl font-bold py-2")

export default function H1({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <h1 className={cn(classes({className}))}>{children}</h1>
        )
}