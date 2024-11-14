'use client'

import { DirectoryListType } from "@/lib/types"
import AdminHeadWrapper from "@/components/admin-page-header"
import ClientDirectoryList from "./client-directory-list"
import { useQuery } from "@tanstack/react-query"
import { queryGetDirectoriesData } from "../actions"

export default function ClientDirectoryContent({directoryData}:DirectoryListType){

    const { data,error,isLoading} = useQuery({
        queryKey:["directories"],
        queryFn: queryGetDirectoriesData
    })
    
    console.log("QUERY DATA", data)
    if(isLoading){
        return <div>Cargando....</div>
    }
    return (
        <div className="mx-6">
            <AdminHeadWrapper title="Directorio Condominio">
                <ClientDirectoryList directoryData={directoryData}/>
            </AdminHeadWrapper>
        </div>
    )   
}