'use client'

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";

type SidebarItemProps = {
    icon: LucideIcon;
    label: string;
    href: string;
    disabled?: boolean;
    logout?: () => void
}

export const SidebarItem = ({icon:Icon,label,href,disabled,logout}:SidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = (pathname === "/" && href === "/" ||
        pathname === href ||
        pathname.startsWith(`${href}`)
    )

    const onClickFn = () => {
        if(disabled) return
        logout ? logout() : router.push(href)
    }
    return (
        <button onClick={onClickFn}
            className={cn(
                "p-2 rounded-lg transition text-slate-700/50 w-full",
                isActive ? "bg-cyan-900 text-white scale-105": "hover:bg-gradient-to-tr from-slate-300 to-white hover:text-black duration-150"
            )}
            disabled={disabled}
        >
            <div className="flex">
                <Icon 
                    size={22}
                    className="mr-2"
                />
                {label}
            </div>
        </button>
    )
}