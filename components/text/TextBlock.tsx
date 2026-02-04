export default function TextBlock({ children }: { children: React.ReactNode }) {
    return <div className="px-4 text-md text-pretty">{children}</div>;
}
