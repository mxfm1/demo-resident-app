'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import DirectorySearch from "./client-search-directory"
import DirectoryItem from "./directory-item copy"
import { useInfiniteQuery } from "@tanstack/react-query"
import { queryGetDirectoriesData } from "../actions"
import DirectoryLoader from "@/components/directory-loader"
import { useInView } from 'react-intersection-observer'
import DirectoryItemLoader from "@/components/directory-item-loader"
import DirectoryError from "@/components/directory-error"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function DirectoryList(){

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const pageItemSize = 6
    const { ref, inView } = useInView({
        threshold: 1
    })
    const {data, isLoading, isError, hasNextPage, fetchNextPage,isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["directories",search],
        queryFn: ({pageParam = 1}) => queryGetDirectoriesData({pageParam,search}),
        initialPageParam: 1,
        getNextPageParam: (lastPage,allPages) =>{
           if(lastPage.length < pageItemSize){
            return undefined
           }
           return allPages.length + 1
        } 
    })
    const isEmpty = data?.pages.every(page => page.length === 0)

    useEffect(() => {
        if(inView){
            fetchNextPage()
        }   
    },[fetchNextPage,inView])

    if(isLoading) {
        return <DirectoryLoader />
    }

    if(isError){
        return <DirectoryError />
    }
    

    return (
        <div className="py-5 border rounded-md min-h-screen ">
            <p className="text-md md:text-xl text-center py-4">Información de los residentes del Condominio. Si deseas ver mas información, haz click en una casa..</p>
            <div className="flex justify-between items-center p-6">
                <DirectorySearch />
                <Link href="/directorios/agregar" className="">
                    <Button className="bg-cyan-900 hover:bg-cyan-700 gap-2">
                        <Plus />
                        Agregar
                    </Button>
                    
                </Link>
            </div>

            {isEmpty ? (
                <p className="text-center text-lg text-gray-600 py-5">
                    No existen propiedades con el identificador dado, por favor intenta con otra búsqueda
                </p>
            ):(
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
                    {data?.pages.map(page => {
                        return page.map((dir,index) => (
                            <DirectoryItem
                                index={index}
                                key={index}
                                identifier={dir.identifier}
                                residents={dir.residents}
                            />
                        ))
                    })}
                </div>
            {hasNextPage && !isEmpty && <DirectoryItemLoader loaderRef={ref}/>}
            </>
            )}
        </div>
    )
}