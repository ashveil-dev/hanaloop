"use client";

import Image from "next/image";
import Link from "next/link";
import { useMenuStore } from "@/stores/useMenuStore";

function MenuIcon() {
    return (
        <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
    );
}

export default function AppHeader() {
    const toggleMenu = useMenuStore((state) => state.toggleMenu);

    return (
        <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/90 font-suit backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

            <div className="flex h-16 items-center justify-between px-4 md:h-[4.5rem] md:px-8">
                <Link
                    href="/"
                    className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
                >
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80 transition group-hover:shadow-md group-hover:ring-emerald-200/80 md:h-11 md:w-11">
                        <Image
                            src="/icons/hanaloop.png"
                            width={44}
                            height={44}
                            alt="hanaloop"
                            className="h-full w-full object-contain p-0.5"
                            priority
                        />
                    </div>

                    <div className="min-w-0 leading-tight">
                        <h1 className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-lg font-bold tracking-tight text-transparent md:text-xl">
                            hanaloop
                        </h1>
                        <p className="hidden truncate text-xs text-slate-400 md:block">
                            Carbon emission intelligence
                        </p>
                    </div>
                </Link>

                <div className="flex shrink-0 items-center gap-2 md:gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 lg:flex">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
                        </span>
                        <span className="text-xs font-medium text-slate-600">Live</span>
                    </div>

                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-label="메뉴 열기"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/50 md:hidden"
                    >
                        <MenuIcon />
                    </button>
                </div>
            </div>
        </header>
    );
}
