import SideSheetItem from "@/app/(dashboard)/admin/directory/_components/resident-sidesheet-item"
import { toCamelCase } from "@/lib/textFn"
import { ResidentType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"

export default function SidesheetItem({name,email,phone,lastName}:ResidentType){
    return (
        <div className="p-4 bg-slate-200 rounded-xl my-2 shadow-lg">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl font-medium">Nombre</h1>
                    <p>{toCamelCase(name)} {toCamelCase(lastName || "")}</p>
                </div>
                <div>
                    <h1>Correo</h1>
                    <p>{email ? email : "No definido.."}</p>
                </div>
            </div>

            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl font-medium">Teléfono</h1>
                    <p className="text-md text-slate-700">+56 {phone}</p>
                </div>
                
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
                <Button className="bg-cyan-900 text-white" disabled={true}>
                    Llamar
                </Button>
                <Button variant="ghost" className="flex bg-green-600 text-white gap-1" disabled={true}>
                    <Smartphone size={16}/>
                    Enviar whatsap
                </Button>
            </div>
        </div>
    )
}