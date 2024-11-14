import { toCamelCase } from "@/lib/textFn";
import { ResidentSideSheetProps } from "@/lib/types";
import { House } from "lucide-react";
import SidesheetItem from "./sidesheet-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResidentSidesheet({identifier,residents}:ResidentSideSheetProps){
    return (
        <div className="h-full">
            <div className="relative">
                <div className="absolute -top-6 -left-[26px] p-3 bg-cyan-900 rounded-br-md">
                    <div className="flex items-center text-white gap-1">
                        <House size={22}/>
                        {toCamelCase(identifier)}
                    </div>
                </div>
            </div>
            <h1 className="text-center text-xl">Información de la Casa</h1>
            <div className="border border-t-0 border-black my-3"/>
            <h1 className="text-xl font-[300]">Residentes</h1>

            {residents.length === 0 && (
                <div className="mt-10">
                    <h1 className="text-center">Esta casa aún no registra residentes asociados..</h1>
                    <div className="flex justify-center mt-10">
                        <Button disabled={true}>Modificar</Button>
                    </div>
                </div>
            )}

            {residents.length > 0 && (
                residents.map((resident) => (
                    <SidesheetItem 
                        name={resident.name}
                        email={resident.email}
                        phone={resident.phone}
                        lastName={resident.lastName}
                    />
                ))
            )}
        </div>
    )
}