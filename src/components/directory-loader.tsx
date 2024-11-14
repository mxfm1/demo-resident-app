import { Loader } from "lucide-react";

export default function DirectoryLoader(){
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader  className="animate-spin text-cyan-900" size={48} />
        </div>
    )
}