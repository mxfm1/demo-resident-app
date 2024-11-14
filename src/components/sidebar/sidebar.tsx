import { assertAuthenticated, getCurrentUser } from "@/lib/session"
import { getProfileDataUseCase } from "@/use-cases/profile"
import SidebarContent from "./sidebar-content"
import React, { Suspense } from "react"
import SidebarLoader from "@/components/sidebar-loader"
import { ErrorComponent } from "@/components/errors/custom-error"

const Sidebar = () => {
    return (
        <Suspense fallback={<SidebarLoader />}>
            <SidebarWrapper />
        </Suspense>
    )
}

async function SidebarWrapper(){

    try {
        const user = await assertAuthenticated();
        const profile = await getProfileDataUseCase(user.id); 
        return <SidebarContent profile={profile} />;
      } catch (error){
        return <ErrorComponent error={error}/>
      }
    }

export default Sidebar;
