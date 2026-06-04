"use client";

import { useEffect } from "react";
import { clsx } from "clsx";
import SidebarNavItem from "./SidebarNavItem";
import { useMenuStore } from "@/stores/useMenuStore";
import DashboardIcon from "@/components/icons/sidebar/DashboardIcon";
import GroupsIcon from "@/components/icons/sidebar/GroupsIcon";
import RecordsIcon from "@/components/icons/sidebar/RecordsIcon";
import EmissionFactorsIcon from "@/components/icons/sidebar/EmissionFactorsIcon";

const navItems = [
    {
        title: "홈",
        description: "대시보드 개요 및 KPI",
        href: "/",
        alt: "dashboard page",
        Icon: DashboardIcon,
        color: "emerald" as const,
    },
    {
        title: "그룹",
        description: "조직 계층 및 관리 그룹",
        href: "/group",
        alt: "groups page",
        Icon: GroupsIcon,
        color: "cyan" as const,
    },
    {
        title: "레코드",
        description: "배출 데이터 및 기록",
        href: "/records",
        alt: "records page",
        Icon: RecordsIcon,
        color: "teal" as const,
    },
    {
        title: "배출 계수",
        description: "활동량별 CO2e 환산 계수",
        href: "/emission-factors",
        alt: "emission factors page",
        Icon: EmissionFactorsIcon,
        color: "amber" as const,
    },
];

export default function AppSidebar() {
    const open = useMenuStore((state) => state.open);
    const closeMenu = useMenuStore((state) => state.closeMenu);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="메뉴 닫기"
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] md:hidden"
                />
            )}

            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 flex w-[min(100%,18rem)] flex-col overflow-y-auto border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 md:static md:z-auto md:w-20 md:shrink-0 md:translate-x-0 md:border-r-0 md:bg-transparent md:shadow-none",
                    open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="h-16 shrink-0 md:h-20" />
                <nav className="w-full px-4 py-4 md:px-2 md:py-3">
                    <ul className="flex flex-col gap-3 md:gap-4">
                        {navItems.map((item) => (
                            <SidebarNavItem key={item.title} onClick={closeMenu} {...item} />
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
