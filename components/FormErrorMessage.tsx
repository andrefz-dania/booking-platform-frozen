export default function FormErrorMessage({ message, fillSpace }: { message?: string; fillSpace?: boolean }) {
  // ... (rest of the code remains the same)
    return (
        <p className="relative -top-2 text-sm text-destructive">{message}{fillSpace ? " " : ""}</p>
    )
}