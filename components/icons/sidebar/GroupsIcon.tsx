import type { SidebarIconProps } from "./types";
import { sidebarIconColors } from "./types";

export default function GroupsIcon({ active = false, className }: SidebarIconProps) {
    const { active: fill, idle } = sidebarIconColors.cyan;
    const primary = active ? fill : idle;

    return (
        <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <circle
                cx="17"
                cy="9"
                r="4.25"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
            />
            <circle
                cx="8.5"
                cy="24"
                r="3.75"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
                opacity={active ? 0.9 : 1}
            />
            <circle
                cx="25.5"
                cy="24"
                r="3.75"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
                opacity={active ? 0.9 : 1}
            />
            <path
                d="M13.5 14.5 C11.5 16.5 10.5 19 10 22"
                stroke={primary}
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M20.5 14.5 C22.5 16.5 23.5 19 24 22"
                stroke={primary}
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            {active && (
                <>
                    <circle cx="17" cy="9" r="1.5" fill="white" />
                    <circle cx="8.5" cy="24" r="1.2" fill="white" />
                    <circle cx="25.5" cy="24" r="1.2" fill="white" />
                </>
            )}
        </svg>
    );
}
