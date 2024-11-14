'use server'

import { z } from "zod";
import { authenticatedAction } from "@/lib/safe-actions";
import { CheckPreviousHouseUseCase } from "@/use-cases/house";
import { AddResidentUseCase } from "@/use-cases/resident";

export const searchProperyAvailiability = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            identifier: z.string()
            .min(1,{message:"Debes ingresar un identificador.."})
        })
    )
    .handler(async({input,ctx}) => {
        const isCreated = await CheckPreviousHouseUseCase(input.identifier)
        const avMessage = isCreated ? 'La propiedad está ocupada..' : "La propiedad está disponible"
        const avaliable = isCreated
        return { 
            message: avMessage,
            status: avaliable
        }
    })


export const addPropertyResidents = authenticatedAction
    .createServerAction()
    .input(
        z.object({
            identifier: z.string(),
            name: z.string(),
            lastName: z.string(),
            email: z.string(),
            phone: z.string(),
        })
    )
    .handler(async({input:{identifier,name,lastName,email,phone},ctx}) => {
        await AddResidentUseCase({identifier,name,lastName,email,phone})
    })