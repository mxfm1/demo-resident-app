'use client'

import {  Home, House, Pickaxe } from "lucide-react"
import { SidebarItem } from "./sidebar-item"

const routes = [
    {
        icon: Home,
        label: "Inicio",
        href: "/inicio"
    },{
        icon: House,
        label: "Directorios",
        href: "/directorios"
    },{
        icon: Pickaxe,
        label: "Próximamente",
        href: "/next",
        disabled: true
    }
]

export default function SidebarRoutes(){

    return (
        <div className="w-full flex flex-col space-y-1">
            {routes.map((route,index) => (
                <SidebarItem
                    key={index} 
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    disabled={route.disabled}
                />
            ))}
        </div>
    )
}