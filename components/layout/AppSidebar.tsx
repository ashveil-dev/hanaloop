"use client"

import Link from "next/link";
import SidebarNavItem from "./SidebarNavItem";
import { useState } from "react";

const navItems = [
    {
        title: "홈",
        description: "대시보드 개요 및 KPI",
        icon: "/icons/home.png",
        activeIcon: "/icons/home_fill.png",
        alt: "dashboard page",
        color: "emerald" as const,
    },
    {
        title: "그룹",
        description: "조직 계층 및 관리 그룹",
        icon: "/icons/people.png",
        activeIcon: "/icons/people_fill.png",
        alt: "groups page",
        color: "cyan" as const,
    },
    {
        title: "레코드",
        description: "배출 데이터 및 기록",
        icon: "/icons/server.png",
        activeIcon: "/icons/server_fill.png",
        alt: "records page",
        color: "teal" as const,
    },
];

const sections = [
    {
        title: "전체 배출량",
        descrption: "",
        href: "#StatCard"
    },
    {
        title: "Scope별 배출량",
        descrption: "",
        href: "#ScopeBreakdownCard"
    },
    {
        title: "계층별 배출량",
        descrption: "",
        href: "#HierarchyEmissionCard"
    },
]

export default function AppSidebar() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const onClick = (index : number) => () => {
        setSelectedIndex(index)
    }
    
    return (
        <aside className="hidden h-full shrink-0 md:flex md:w-auto md:flex-row md:bg-transparent">
            <div className="block h-20 w-full md:hidden" />

            <nav className="w-full px-4 py-6 md:w-[110px] md:shrink-0 md:px-3">
                <ul className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <SidebarNavItem key={item.title} {...item} />
                    ))}
                </ul>
            </nav>

            <section className="hidden h-full min-w-[320px] flex-1 border-l border-slate-200/70 bg-white/70 p-6 backdrop-blur md:block">
                <header className="mb-8 border-b border-slate-200 pb-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-emerald-600">
                                Dashboard Navigation
                            </p>
                            <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                Home
                            </h3>
                        </div>
                    </div>
                </header>

                <ul className="mt-8 flex flex-col gap-3">
                    {sections.map((item, index) => (
                        <li key={item.title} onClick={onClick(index)}>
                            <Link href={item.href}>
                                <button
                                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition cursor-pointer ${index === selectedIndex
                                        ? "border-emerald-200 bg-emerald-50"
                                        : "border-slate-200 bg-white hover:bg-slate-50"
                                        }`}
                                >

                                    <div>
                                        <h5 className="font-semibold text-slate-800">{item.title}</h5>
                                        <p className="mt-1 text-sm text-slate-400">
                                            {item.descrption}
                                        </p>
                                    </div>

                                    <div
                                        className={`h-2.5 w-2.5 rounded-full ${index === selectedIndex ? "bg-emerald-500" : "bg-slate-300"
                                            }`}
                                    />
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </aside >
    );
}