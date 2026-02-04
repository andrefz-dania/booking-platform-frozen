"use client";
import { Check, CopyIcon } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ string }: { string?: string }) {
    const [copied, setCopied] = useState<boolean>(false)

    function copyToClipBoard(string?: string) {
        if (typeof string == "string" && string.length > 0) {
            navigator.clipboard.writeText(string);
            setCopied(true)
            setTimeout(() => setCopied(false), 1000)
        }
    }
    return (
        <button
            className="hover:cursor-pointer hover:bg-accent p-2 -m-4 rounded-md"
            onClick={() => {
                copyToClipBoard(string);
            }}
        >
            {copied ? <Check className="text-muted-foreground" /> : <CopyIcon className="text-muted-foreground" />}
        </button>
    );
}
