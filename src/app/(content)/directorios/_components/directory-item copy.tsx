'use client'

import { ResidentType } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { House } from "lucide-react";
import ResidentInformation from "./resident-item";
import ResidentSidesheet from "./resident-sidesheet";
import { toCamelCase } from "@/lib/textFn";
import { easeInOut, motion } from 'framer-motion' 

type DirectoryItemProps = {
    identifier: string
    residents: ResidentType[]
    index: number
}

export default function DirectoryItem({identifier, residents,index}:DirectoryItemProps){
    return (
        <motion.div 
            className="bg-slate-100 rounded-md shadow-xl hover:scale-105 transition w-full border min-h-40"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{
                delay:index * 0.15,
                ease: easeInOut,
                duration: 0.5
            }}
            >
                <div className="relative">
                    <div className="absolute top-0 right-0 flex items-center justify-center bg-cyan-900 rounded-bl-md p-1 md:p-2 text-white gap-2">
                        <House className="w-4 md:w-6"/>
                        <h1>{toCamelCase(identifier)}</h1>
                    </div>
                </div>
                <div className="h-full">
                    <Sheet>
                        <SheetTrigger className="w-full h-full">
                            {residents.length === 0 && (
                                <div className="flex items-center justify-center">
                                    <h1>Aún no se registran residentes</h1>
                                </div>
                            )}
                            {residents.length > 0 && (
                                <div className="">
                                    <ResidentInformation residents={residents}/>
                                </div>
                            )}
                        </SheetTrigger>
                        <SheetContent>
                            <ResidentSidesheet identifier={identifier} residents={residents} />
                        </SheetContent>
                    </Sheet>
                </div>
            </motion.div>
    )
}