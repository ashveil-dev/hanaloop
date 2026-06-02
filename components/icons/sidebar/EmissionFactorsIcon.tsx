import type { SidebarIconProps } from "./types";
import { sidebarIconColors } from "./types";

export default function EmissionFactorsIcon({ active = false, className }: SidebarIconProps) {
    const { active: fill, idle } = sidebarIconColors.amber;
    const primary = active ? fill : idle;

    return (
        <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <path
                d="M17 6 C17 6 11 13 11 18.5 C11 21.5 13.5 24 17 24 C20.5 24 23 21.5 23 18.5 C23 13 17 6 17 6 Z"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
                strokeLinejoin="round"
            />
            <path
                d="M17 14 V20"
                stroke={active ? "white" : primary}
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M14 17 H20"
                stroke={active ? "white" : primary}
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <rect
                x="5"
                y="26"
                width="24"
                height="5"
                rx="2"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.5"
                opacity={active ? 0.95 : 1}
            />
            {!active && (
                <>
                    <path d="M9 28.5 H12" stroke={primary} strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M14 28.5 H17" stroke={primary} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
                    <path d="M19 28.5 H25" stroke={primary} strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
                </>
            )}
            {active && (
                <>
                    <path d="M8 28.5 H11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M13 28.5 H16" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
                    <path d="M18 28.5 H26" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
                </>
            )}
        </svg>
    );
}
