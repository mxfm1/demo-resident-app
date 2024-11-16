'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useServerAction } from "zsa-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Terminal} from "lucide-react"
import { Button } from "@/components/ui/button"
import { userLoginAction } from "../actions"
import LoaderButton from "@/components/loader-button"

const loginSchema = z.object({
    email:  z.string().email({message: "Debes ingresar un email válido"}),
    password: z.string()
})

export default function LoginForm(){

    const form = useForm<z.infer <typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const {execute, isPending, error} = useServerAction(userLoginAction)

    const handleFormSubmit = (values: z.infer <typeof loginSchema>) => {
        execute(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="py-4">
                <FormField 
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="relative w-full mb-8">
                            <Mail 
                                className="absolute top-1/2 left-3 -translate-y-3 text-slate-600"
                                size={22}/>
                            <FormControl>
                                <Input
                                    placeholder="Correo.."
                                    {...field}
                                    className="pl-10 rounded-xl bg-slate-50 text-slate-700 font-[300]"
                                />
                            </FormControl>
                            <div className="absolute">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="relative w-full mb-8">
                            <Lock 
                                className="absolute top-1/2 left-3 -translate-y-3 text-slate-600"
                                size={22}
                                />
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Contraseña.."
                                    className="pl-10 rounded-xl bg-slate-50 text-slate-700 font-[300]"
                                    {...field}
                                />
                            </FormControl>
                            <div className="relative">
                                <FormMessage 
                                    className="absolute"
                                />
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pb-4">
                    <span className="text-xs"><p className="text-cyan-900 underline text-end text-[300]">Contactar a administracion</p></span>
                </div>
        
                <div className="flex justify-center pb-3">
                    <LoaderButton isLoading={isPending} className="bg-cyan-900 hover:bg-cyan-700">
                        Inicia sesión
                    </LoaderButton>
                </div>
                {error && (
                    <div className="flex text-red-500 absolute">
                        <Terminal />
                        {error.code}
                        {error.message}
                    </div>
                )}
            </form>
        </Form>
    )
}