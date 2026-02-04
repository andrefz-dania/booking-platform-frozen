import H1 from "./H1";

export default function PageHeading({children}: {children: React.ReactNode}) {
    return (
        <H1 className="mt-12 mb-4 px-4 text-pretty">{children}</H1>
    )
    
}