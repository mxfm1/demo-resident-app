import Sidebar from "@/components/sidebar/sidebar"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function AppContentLayout({children}:{children:React.ReactNode}){

    const user = await getCurrentUser()
    if(!user){
        return redirect("/login")
    }
    return (
        <>
        <div className="block md:flex">
            <div className="w-full md:w-56 static md:fixed md:border-r-slate-200 md:h-screen bg-gradient-to-br from-slate-400 to-white">
                <Sidebar />
            </div>
            <div className="md:ml-56 w-full bg-gradient-to-tr from-slate-400 to-white min-h-screen h-fit pb-4 md:pb-8">
                {children}
            </div>
        </div>
        </>
    )
}