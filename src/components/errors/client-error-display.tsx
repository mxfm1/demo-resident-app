'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Home } from "lucide-react"

type ErrorClientDisplayProps = {
    message: string
}

export default function ErrorClientDisplay({message}:ErrorClientDisplayProps){
    const router = useRouter()
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="bg-red-100 p-2  border rounded-md mx-2">
                <p className="text-lg text-red-600 font-[300]">{message}</p>
                <div className="flex items-center gap-2">
                    <Button className="flex bg-red-600 border-white hover:bg-red-400" onClick={() => window.location.reload()}>
                        Recargar
                    </Button>
                    <Button className="flex bg-cyan-900 hover:bg-cyan-700" onClick={() => router.push("/inicio")}>
                        <Home />
                        Volver
                    </Button>
                </div>
            </div>
        </div>
    )
}