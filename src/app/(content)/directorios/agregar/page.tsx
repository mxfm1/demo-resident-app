'use client'

import {  useState } from "react";
import DirectoryAvailableSearch from "./_components/available-directory";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PropertyRegisterForm from "./_components/propery-register-form";

export default function AddDirectory(){
    const [showDirectoryForm, setShowDirectoryForm] = useState<boolean | undefined>(undefined);
    const [identifier,setIdentifier] = useState<string | undefined>("")

    const displayForm = showDirectoryForm;

    const handleFormDisplayButton = () => {
        setShowDirectoryForm((current) =>!current)
    }

    return (
        <div className="h-fit">
            <div className="bg-cyan-900 h-20"/>
            <div className="flex justify-center">
                <div className="bg-slate-100 py-3 rounded-md shadow-xl -translate-y-[50%] w-fit px-4">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-serif text-center">Registra una nueva propiedad</h1>
                </div>
            </div>

            <div className="relative">
                <Link href="/directorios" className="absolute top-0 right-12">
                    <Button className="flex justify-center space-x-1 bg-cyan-900 hover:bg-cyan-700"
                    >
                        <ArrowLeft />
                        <p>Directorios</p>
                    </Button>
                </Link>
            </div>

            <div className={cn(
                "flex items-center justify-center mt-6",
                
            )}>
                <AnimatePresence>
                    {!displayForm && (
                        <motion.div
                            initial={{ opacity: 0, translateY: 90}}
                            animate={{ opacity: 1, translateY: 0}}
                            exit={{ opacity: 0 , translateY: 0}}
                            transition={{ 
                                duration: 0.8,
                            }}
                            className={cn(
                                "bg-slate-100 p-4 rounded-md hover:shadow-xl max-w-96",
                            )}
                        >
                            <p className="text-center font-xs font-light mx-auto">
                                Valida que la propiedad no este registrada previamente..
                            </p>
                            <DirectoryAvailableSearch 
                                setIdentifier={setIdentifier}
                                setShowForm={setShowDirectoryForm} 
                                />   
                        </motion.div>
                    )}
                    {displayForm && (
                    <div className=" flex items-center justify-center ">
                            <motion.div
                                initial={{ opacity: 0, translateY: -90 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                exit={{ opacity: 0, translateY: 0 }}
                                transition={{ duration: 0.8,
                                    
                                }}
                                className="bg-slate-100 px-12 py-4 rounded-xl shadow-xl max-w-2xl w-[672px]"
                            >
                                <h1 className="text-2xl md:text-3xl lg:text-4xl text-center mb-4">Información Residente</h1>
                                <p className="text-md font-light text-center mb-4">Ingresa la información referente a los residentes de la propiedad..</p>
                            <PropertyRegisterForm changeFormDisplay={handleFormDisplayButton} identifier={identifier}/>
                        </motion.div>
                    </div>
                    
                )}
                </AnimatePresence>
            </div>
        </div>
    )
}