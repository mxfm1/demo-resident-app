import { LogIn } from "lucide-react";

export default function LoginFormWrapper({children}:{children:React.ReactNode}){
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-slate-300 to-white">
            <div className="rounded-lg shadow-2xl bg-slate-100">
                <div className="flex justify-center my-6">
                    <div className="p-3 bg-slate-100 rounded-xl shadow-lg border"> 
                        <LogIn  size={24}/>
                    </div>
                </div>

                <div className="text-center text-2xl">
                    Admin Platform
                </div>

                <div className="min-w-80 p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}