"use client"

import { clsx } from "clsx"
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

    return (
        <aside className={clsx("fixed top-0 w-full h-full overflow-auto bg-white shrink-0 md:static md:flex md:w-auto md:flex-row md:bg-transparent",
            open ? "block" : "hidden"
        )}>
            <div className="block h-20 w-full md:hidden" />
            <nav className="w-full px-4 py-6 md:shrink-0 md:px-3">
                <ul className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <SidebarNavItem key={item.title} onClick={closeMenu} {...item} />
                    ))}
                </ul>
            </nav>
        </aside >
    );
}
