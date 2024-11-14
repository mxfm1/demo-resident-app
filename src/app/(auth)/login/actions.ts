'use server'

import { z } from "zod";

import { authenticatedAction, unauthenticatedAction } from "@/lib/safe-actions";
import { userLoginUseCase } from "@/use-cases/users";
import { setSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { invalidateSession, validateRequest } from "@/util/auth";

export const userLoginAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z.string().email(),
            password: z.string()
        })
    )
    .handler(async({input}) => {
        const user = await userLoginUseCase(input.email, input.password)
        await setSession(user.id)
        return redirect("/inicio")
    })


// CASO DE USO PARA CERRAR SESION DEL USUARIO
export const logoutUserAction = async() => {
    const { session } = await validateRequest()
    if(!session){
        return redirect("/")
    }
    await invalidateSession(session.id)
    redirect("/login")
}