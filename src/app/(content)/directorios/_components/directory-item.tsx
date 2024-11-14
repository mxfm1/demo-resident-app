'use client'

import { ResidentType } from "@/app/lib/types/house"
import { Button } from "@/components/ui/button"
import { House, User } from "lucide-react"
import ResidentItem from "../../(dashboard)/admin/directory/_components/directory-resident-item"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ResidentSideSheet from "../../(dashboard)/admin/directory/_components/resident-side-sheet"

type DirectoryItemProps = {
    identifier: string
    residents: ResidentType[]
}

export const DirectoryItem = ({identifier,residents}:DirectoryItemProps) => {
    return (
        <>
            <div className="bg-slate-100 rounded-md shadow-xl hover:scale-105 transition w-full border min-h-36">
                <div className="relative">
                    <div className="absolute top-0 right-0 flex items-center justify-center bg-cyan-900 rounded-bl-md p-1 md:p-2 text-white gap-2">
                        <House className="w-4 md:w-6"/>
                        <h1 className="">{identifier}</h1>
                    </div>
                </div>
                <div className="w-full">
                    {residents.length === 0 &&(
                        <h1 className="mx-2 text-center mt-10">Esta casa aún no se ha registrado residentes</h1>
                    )}
                   
                    {residents.length > 0 && (
                        <>
                            <Sheet>
                                <SheetTrigger className="w-full">
                                    <ResidentItem residents={residents} />
                                </SheetTrigger>
                                <SheetContent>
                                    <ResidentSideSheet identifier={identifier} residents={residents}/>
                                </SheetContent>
                            </Sheet>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

{/* <div className="flex border-b ">
                <div className="flex w-[10%] items-center px-6">
                    {identifier}
                </div>
                <div className="flex flex-1 items-center">
                    {residents.length === 0 && (
                        <p className="">
                            No tiene residentes asociados..
                        </p>
                    )}
                    {residents.length > 0 && (
                        <div className="flex gap-x-2">
                        {residents.map((resident) => (
                            <div key={resident.id} className="flex gap-x-2">
                            <div>
                                <h1 className="text-slate-500 font-[300]">Nombre</h1>
                                <p>{resident.name} {resident.name}</p>
                            </div>
                            
                            <div>
                                <h1 className="text-slate-500 font-[300]">Teléfono</h1>
                                <p>+56{resident.phone}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
                
                <div className="w-[20%] hidden md:flex">
                    <Button>
                        Detalles
                    </Button>
                </div>
            </div> */}