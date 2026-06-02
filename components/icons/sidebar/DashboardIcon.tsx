import type { SidebarIconProps } from "./types";
import { sidebarIconColors } from "./types";

export default function DashboardIcon({ active = false, className }: SidebarIconProps) {
    const { active: fill, idle } = sidebarIconColors.emerald;
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
                x="4"
                y="4"
                width="11"
                height="11"
                rx="3"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
            />
            <rect
                x="19"
                y="4"
                width="11"
                height="11"
                rx="3"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
                opacity={active ? 0.85 : 1}
            />
            <rect
                x="4"
                y="19"
                width="11"
                height="11"
                rx="3"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
                opacity={active ? 0.7 : 1}
            />
            <rect
                x="19"
                y="19"
                width="11"
                height="11"
                rx="3"
                fill={active ? primary : "none"}
                stroke={primary}
                strokeWidth="1.75"
            />
            {active && (
                <path
                    d="M22 26 L25 23 L27.5 25.5 L30 22"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
            {!active && (
                <path
                    d="M22 26 L25 23 L27.5 25.5 L30 22"
                    stroke={primary}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}
