import Image from "next/image";
import Link from "next/link";

type SidebarNavItemProps = {
    title: string;
    description: string;
    icon: string;
    href: string;
    activeIcon: string;
    alt: string;
    color?: "emerald" | "cyan" | "teal";
    onClick: () => void
};

const colorMap = {
    emerald: "hover:border-emerald-200 hover:bg-emerald-50",
    cyan: "hover:border-cyan-200 hover:bg-cyan-50",
    teal: "hover:border-teal-200 hover:bg-teal-50",
};

export default function SidebarNavItem({
    title,
    description,
    icon,
    href,
    activeIcon,
    alt,
    color = "emerald",
    onClick
}: SidebarNavItemProps) {
    return (
        <li onClick={onClick}>
            <Link href={href}>
                <button
                    className={`group cursor-pointer flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:flex-col md:justify-center md:gap-3 ${colorMap[color]}`}
                >
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl transition-colors group-hover:bg-white">
                        <Image
                            src={icon}
                            width={34}
                            height={34}
                            alt={alt}
                            className="absolute transition-opacity group-hover:opacity-0"
                        />
                        <Image
                            src={activeIcon}
                            width={34}
                            height={34}
                            alt={alt}
                            className="absolute opacity-0 transition-opacity group-hover:opacity-100"
                        />
                    </div>

                    <div className="text-left md:hidden">
                        <h4 className="font-semibold text-slate-800">{title}</h4>
                        <p className="mt-1 text-xs text-slate-400">{description}</p>
                    </div>
                </button>
            </Link>

        </li>
    );
}