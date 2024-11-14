'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoaderButton from "@/components/loader-button";
import { useServerAction } from "zsa-react";
import { searchProperyAvailiability } from "../actions";
import { useEffect, useState } from "react";
import { Check, CircleX, Home, ThumbsUp } from "lucide-react";
import { toCamelCase } from "@/lib/textFn";

export const identifierExp = /^[a-zA-Z]\d+$/;

const formSchema = z.object({
    identifier: z.string()
    .min(1,{message:"Debes ingresar un identificador.."})
    .regex(identifierExp,{message:"Formato de búsqueda: LETRA+ NUMERO"})
})

type DirectoryAvaliableSearchProps = {
    setShowForm: (value:boolean) => void,
    setIdentifier: (value:string) => void
}

const DirectoryAvailableSearch = ({setShowForm,setIdentifier}:DirectoryAvaliableSearchProps) => {

    const[avaliableMessage,setAvaliableMessage] = useState<string | undefined>(undefined)
    const[propertyStatus,setPropertyStatus] = useState<'occupied' | 'avaliable' | undefined >(undefined)
    const {execute,isPending,data} = useServerAction(searchProperyAvailiability)

    useEffect(() => {
        if(data?.message){
            setAvaliableMessage(data.message)
            setPropertyStatus(data.status ? 'occupied' : "avaliable")
            setTimeout(() => {
                setAvaliableMessage(undefined)
            },4000)
        }
        setShowForm(data?.status === false)
    },[data,setShowForm])

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier:""
        },
        mode: "onSubmit"
    })
    const handleFormSubmit = async(values: z.infer <typeof formSchema>) => {
        await execute({
            identifier: toCamelCase(values.identifier)
        })
        setIdentifier(values.identifier)
        form.reset()
    }

    return (
            <Form {...form}>
                 <form onSubmit={form.handleSubmit(handleFormSubmit)} className="pt-1 pb-4">
                <FormField 
                    name="identifier"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="relative w-5/6 flex justify-center mx-auto">
                            <Home  
                                className="absolute left-3 top-1/2 transform -translate-y-2 text-slate-600"
                                size={22}
                                />
                            <FormControl>
                                <Input
                                    placeholder="Buscar disponibilidad.."
                                    {...field}
                                    className="pl-10"
                                />
                            </FormControl>
                                
                            <FormMessage className="absolute top-12"/>
                        </FormItem>
                    )}
                />

                <div className="mt-10 mb-6 flex justify-center">
                    <LoaderButton isLoading={isPending} loadingText="Verificando..">
                        Ver Disponibilidad
                    </LoaderButton>
                </div>

                {avaliableMessage && (
                    <div className="flex items-center justify-center space-x-1">
                        <p className={propertyStatus === 'avaliable' ? "text-green-500" : "text-red-500"}>
                            {avaliableMessage}
                        </p>
                        {propertyStatus === 'avaliable' ? <Check  className="text-green-500"/>: <CircleX className="text-red-500"/>}
                    </div>
                )}
                </form>
            </Form>
        
    )
}

export default DirectoryAvailableSearch