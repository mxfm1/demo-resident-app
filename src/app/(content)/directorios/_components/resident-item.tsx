import ResidentItem from "@/app/(dashboard)/admin/directory/_components/directory-resident-item"
import { toCamelCase } from "@/lib/textFn"
import { ResidentItemProps } from "@/lib/types"
import { AtSign, Mail, PhoneCall } from "lucide-react"

export default function ResidentInformation({residents}:ResidentItemProps){
    return (
        <div className="">
            {residents.map((resident,index) => (
                <div key={index} className="grid grid-cols-2 pr-10">
                <div className="flex flex-col pl-6">
                  <h1 className="text-xl font-[300] text-start">{toCamelCase(resident.name)} {toCamelCase(resident.lastName || "")}</h1>
                  <div className="flex items-center gap-1 justify-start ml-1">
                    <Mail size={16} />
                    <p className="text-sm content-end text-[300] text-slate-700">{!resident.email ? "No registrado" : resident.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 hover:scale-150 transition-all">
                  <div className="p-2 rounded-lg border shadow-xl">
                    <PhoneCall size={22}/>
                  </div>
                  <p className="">+56 {resident.phone}</p>
                </div>
              </div>
            ))} 
        </div>
    )
}