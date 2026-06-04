"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import type { SidebarIconProps } from "@/components/icons/sidebar/types";

type SidebarNavItemProps = {
    title: string;
    description: string;
    href: string;
    alt: string;
    Icon: ComponentType<SidebarIconProps>;
    color?: "emerald" | "cyan" | "teal" | "amber";
    onClick: () => void;
};

const colorMap = {
    emerald: {
        hover: "hover:border-emerald-200 hover:bg-emerald-50",
        active: "border-emerald-300 bg-emerald-50 shadow-emerald-100",
    },
    cyan: {
        hover: "hover:border-cyan-200 hover:bg-cyan-50",
        active: "border-cyan-300 bg-cyan-50 shadow-cyan-100",
    },
    teal: {
        hover: "hover:border-teal-200 hover:bg-teal-50",
        active: "border-teal-300 bg-teal-50 shadow-teal-100",
    },
    amber: {
        hover: "hover:border-amber-200 hover:bg-amber-50",
        active: "border-amber-300 bg-amber-50 shadow-amber-100",
    },
};

function isNavActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SidebarNavItem({
    title,
    description,
    href,
    alt,
    Icon,
    color = "emerald",
    onClick,
}: SidebarNavItemProps) {
    const pathname = usePathname();
    const isActive = isNavActive(pathname, href);
    const styles = colorMap[color];

    return (
        <li onClick={onClick}>
            <Link href={href} aria-label={alt}>
                <button
                    type="button"
                    className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:bg-slate-50 md:flex-col md:justify-center md:gap-2 md:border-transparent md:bg-transparent md:p-2 md:shadow-none md:hover:-translate-y-0.5 md:hover:bg-white md:hover:shadow-md ${styles.hover} ${
                        isActive ? styles.active : ""
                    }`}
                >
                    <div
                        className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl transition-colors md:h-8 md:w-8 ${
                            isActive ? "bg-white" : "group-hover:bg-white"
                        }`}
                    >
                        {isActive ? (
                            <Icon active className="h-8 w-8 md:h-[34px] md:w-[34px]" />
                        ) : (
                            <>
                                <Icon
                                    active={false}
                                    className="h-8 w-8 transition-opacity group-hover:opacity-0 md:h-[34px] md:w-[34px]"
                                />
                                <Icon
                                    active
                                    className="absolute h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 md:h-[34px] md:w-[34px]"
                                />
                            </>
                        )}
                    </div>

                    <div className="min-w-0 text-left md:hidden">
                        <h4 className="font-semibold text-slate-800">{title}</h4>
                        <p className="mt-1 text-xs text-slate-400">{description}</p>
                    </div>
                </button>
            </Link>
        </li>
    );
}
