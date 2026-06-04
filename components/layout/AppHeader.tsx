"use client"

import Image from "next/image";
import Link from "next/link";
import { useMenuStore } from "@/stores/useMenuStore";

export default function AppHeader() {
  const toggleMenu = useMenuStore(state => state.toggleMenu)

  const onMenuClick = () => {
    toggleMenu();
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl font-suit">
      <div className="flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 md:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-105 md:h-12 md:w-12">
            <Image src="/icons/logo.png" width={34} height={34} alt="logo" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight text-slate-900 md:text-2xl">
              하나 대시보드
            </h1>
            <p className="hidden text-sm text-slate-500 md:block">
              Carbon Neutrality Compliance Platform
            </p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-emerald-700">
              Live Monitoring
            </span>
          </div>

          <button onClick={onMenuClick} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 md:hidden cursor-pointer">
            <Image src="/images/menu.png" width={24} height={24} alt="Menu" />
          </button>
        </div>
      </div>
    </header>
  );
}