export type SidebarIconProps = {
    active?: boolean;
    className?: string;
};

export const sidebarIconColors = {
    emerald: { active: "#10b981", idle: "#94a3b8" },
    cyan: { active: "#06b6d4", idle: "#94a3b8" },
    teal: { active: "#14b8a6", idle: "#94a3b8" },
    amber: { active: "#f59e0b", idle: "#94a3b8" },
} as const;
