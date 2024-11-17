'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import LoaderButton from "@/components/loader-button";
import { useServerAction } from "zsa-react";
import { addPropertyResidents } from "../actions";
import { House, Mail, Smartphone, Terminal, Users } from "lucide-react";
import { toCamelCase } from "@/lib/textFn";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    identifier: z.string(),
    name: z.string().min(1,{message:"Obligatorio**"}),
    lastName: z.string().min(1,{message:"Obligatorio**"}),
    email: z.string(),
    phone: z.string().min(1,{message:"Obligatorio**"})
})

export default function PropertyRegisterForm({identifier,changeFormDisplay}:{identifier:string |undefined,changeFormDisplay: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}){

    const { toast } = useToast()

    // AGREGAR UN TOAST MEJOR EN CASO DEL ERROR DE MAX REGISTROS X PERSONA
    // TIMER EN EL TOAST
    //SE PUEDE VACIAR LOS CAMPOS DEL FORMULARIO DESPUES DE QUE LA ACCION FUE EXITOSA??
    const {execute, isPending, error} = useServerAction(addPropertyResidents,{
        onSuccess(){
            toast({
                title: "Residente Agregado",
                description: "El registro fue añadido exitosamente.."
            })
        }
    })

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: toCamelCase(identifier),
            name: "",
            lastName: "",
            email: "",
            phone: ""
        },
    })


    const handleFormSubmit = (values:z.infer<typeof formSchema>) => {
        execute(values)
        form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
                <FormField 
                    name="identifier"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="relative space-y-1">
                                    <Button className="absolute top-2 right-0 flex justify-center gap-x-2">
                                        2 Max
                                        <Users />
                                    </Button>
                                <FormLabel className="text-lg font-medium mb-0">
                                    Residencia
                                </FormLabel>
                                <House
                                    size={22}
                                    className="absolute left-3 top-1/2 transform text-slate-900"
                                />
                            <FormControl>
                                <Input 
                                    {...field}
                                    disabled={true}
                                    className="w-2/5 pl-10 rounded-xl"
                                />
                            </FormControl>

                            <FormMessage className="absolute"/>
                        </FormItem>
                    )}
                />
                <div className="flex justify-center space-x-3 pb-2">
                    <FormField 
                        name="name"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="w-1/2">
                                <FormControl>
                                    <Input 
                                        placeholder="Nombre.."
                                        className="rounded-xl"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage className="absolute"/>
                            </FormItem>
                        )}
                    />

                    <FormField 
                        name="lastName"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input 
                                        placeholder="Apellido.."
                                        className="rounded-xl"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage  className="absolute"/>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField 
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="relative space-y-0">
                            <Mail 
                                size={22}
                                className="absolute left-3 top-1/2 transform -translate-y-3 text-slate-500"
                            />
                            <FormControl>
                                <Input 
                                    placeholder="Correo.."
                                    className="pl-10 rounded-xl"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="phone"
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="relative space-y-0">
                            <Smartphone
                                size={22}
                                className="absolute left-3 top-1/2 transform -translate-y-3 text-slate-500"
                            />
                            <FormControl>
                                <Input 
                                    placeholder="Teléfono"
                                    {...field}
                                    className="pl-10 rounded-xl"
                                />
                            </FormControl>

                            <FormMessage className="absolute"/>
                        </FormItem>
                    )}
                />

                <div className="flex justify-center space-x-5">
                    <LoaderButton isLoading={isPending} variant="custom">
                        Agregar residente
                    </LoaderButton>

                    <Button
                        onClick={changeFormDisplay}
                        className="bg-slate-900"
                    >
                        Volver
                    </Button>
                </div>

                {error && (
                    <div className="flex justify-center">
                        <Alert variant="destructive" className="max-w-96">
                            <Terminal className="w-4 h-4"/>
                            <AlertTitle>Hubo un Error</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    </div>
                )}
            </form>
        </Form>
    )
}