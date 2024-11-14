import { getCurrentUser } from "@/lib/session";
import { ReactNode } from "react";

export async function LoggedIn({children}:{children:ReactNode}){
    const user = await getCurrentUser()
    return user && <>{children}</>
}

export async function LoggedOut({children}:{children:ReactNode}){
    const user = await getCurrentUser()
    return !user && <>{children}</>
}