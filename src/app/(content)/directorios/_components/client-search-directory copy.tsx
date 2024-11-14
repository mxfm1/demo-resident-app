'use client'

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce'

export default function DirectorySearch(){

    const search = useSearchParams()
    const persistentQuery = search.get("search")

    const[searchQuery,setSearchQuery] = useState(persistentQuery)
    const[debouncedQuery] = useDebounce(searchQuery,800)
    const router = useRouter()

    useEffect(() => {
        if(!debouncedQuery){
            router.push("/directorios")
        }else{
            router.push(`/directorios?search=${debouncedQuery}`)
        }
    },[debouncedQuery, router])
    
    return(
        <div className="bg-slate-100 p-5 rounded-md w-full md:w-3/4">
            <div className="relative w-full">
                <Input 
                    placeholder="Busca el ID de una propiedad.."
                    className="pl-10"
                    value={searchQuery || ''}
                    onChange={(e) =>setSearchQuery(e.target.value)}
                />
                <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-3 text-slate-400"
                />
            </div>
        </div>
    )
}
