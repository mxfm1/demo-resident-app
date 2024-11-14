'use client'

import { toCamelCase } from "@/lib/textFn";
import { profileType } from "@/lib/types";
import SidebarRoutes from "./sidebar-routes";
import { SidebarItem } from "./sidebar-item";
import { Power } from "lucide-react";
import ProfileAvatar from "../profile-avatar";
import { logoutUserAction } from "@/app/(auth)/login/actions";

export default function SidebarContent({profile}:{profile:profileType}){
    
    const logoutButton = async() =>  {
        await logoutUserAction()
    }

    return (
        <div className="p-4 flex flex-col md:min-h-screen">

            <div className="flex space-x-2">
                <ProfileAvatar profileIMG={profile.lastName}/>
                <div>
                    <h1 className="text-xl">Bienvenido</h1>
                    <p className="text-slate-700 text-xl font-light">{toCamelCase(profile.name || "")}</p>
                </div>
            </div>

            <div className="my-7 border border-white border-t-0"/>
            <div className="">
                <SidebarRoutes />
            </div>

            <div className="mt-auto">
                <SidebarItem 
                    icon={Power}
                    label="Cerrar Sesión"
                    href="/login"
                    logout={logoutButton}
                />
            </div>
        </div>
    )
}