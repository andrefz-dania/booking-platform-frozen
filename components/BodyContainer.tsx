export default function BodyContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col mx-auto justify-center w-full max-w-6xl">
            {children}
        </div>
    )}