'use client'

import Link from "next/link";
import DirectorySearch from "./client-search-directory";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DirectoryListType } from "@/lib/types";
import DirectoryItem from "./directory-item copy";
import { Frown } from "lucide-react";

export default function ClientDirectoryList({directoryData}:DirectoryListType){
    const[searchValue,setSearchValue] = useState('')
    
    const filteredDirectories = directoryData.filter((house) => (
        house.identifier.toLowerCase().includes(searchValue.toLowerCase())
    ))

    return (
        <div className="py-4 h-screen">
            <p className="text-xl text-center py-4">Información de los residentes del Condominio. Clickea un elemento para ver más información</p>
            <div className="flex justify-between items-center p-6">
                <DirectorySearch value={searchValue} onSearch={setSearchValue}/>

                <Link href="/directorios/agregar">
                    <Button className="bg-cyan-900">Agregar Directorio</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
                {filteredDirectories.length > 0 ? (
                    filteredDirectories.map((directory,index) => (
                        <DirectoryItem 
                            key={directory.identifier}
                            residents={directory.residents}
                            identifier={directory.identifier}
                            index={index}
                        />
                    ))
                ):(
                    <>
                        <div className="flex py-12 gap-2 ml-6">
                            <Frown className="text-slate-600"/>
                            <p>Upss No existen propiedades con este identificador..</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}