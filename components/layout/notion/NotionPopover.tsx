"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
    trigger: (props: { open: boolean; onToggle: () => void }) => ReactNode;
    children: ReactNode;
    align?: "left" | "right";
};

export default function NotionPopover({ trigger, children, align = "left" }: Props) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    return (
        <div ref={containerRef} className="relative">
            {trigger({
                open,
                onToggle: () => setOpen((prev) => !prev),
            })}

            {open && (
                <div
                    className={`absolute top-[calc(100%+6px)] z-50 min-w-[300px] rounded-lg border border-slate-200/80 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.12)] ${
                        align === "right" ? "right-0" : "left-0"
                    }`}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
