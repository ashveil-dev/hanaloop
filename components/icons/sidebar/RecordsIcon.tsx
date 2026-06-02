import type { SidebarIconProps } from "./types";
import { sidebarIconColors } from "./types";

export default function RecordsIcon({ active = false, className }: SidebarIconProps) {
    const { active: fill, idle } = sidebarIconColors.teal;
    const primary = active ? fill : idle;

    return (
        <svg
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <rect
                x="7"
                y="5"
                width="20"
                height="24"
                rx="3.5"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
            />
            <path
                d="M12 12 H22"
                stroke={active ? "white" : primary}
                strokeWidth="1.75"
                strokeLinecap="round"
            />
            <path
                d="M12 17 H22"
                stroke={active ? "white" : primary}
                strokeWidth="1.75"
                strokeLinecap="round"
                opacity={active ? 0.95 : 0.85}
            />
            <path
                d="M12 22 H18"
                stroke={active ? "white" : primary}
                strokeWidth="1.75"
                strokeLinecap="round"
                opacity={active ? 0.9 : 0.7}
            />
            {!active && (
                <path
                    d="M21 22 L23 24 L27 20"
                    stroke={primary}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
            {active && (
                <circle cx="24" cy="24" r="5" fill="white" />
            )}
            {active && (
                <path
                    d="M22.2 24 L23.6 25.4 L26 22.5"
                    stroke={fill}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}
