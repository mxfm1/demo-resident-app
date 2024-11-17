import { createServerActionProcedure } from "zsa";
import { PublicError } from "./errors";
import { assertAuthenticated } from "./session";

function shape_errors({err}:any){
    const isAllowedError = err instanceof PublicError
    const isDev = process.env.NODE_ENV === 'development' 

    if(isAllowedError || isDev){
        console.error(err)
    
        console.log("ERR",err)
        return {
            code: err.code ?? 'ERROR',
            message: `${isAllowedError && isDev ? 'DEV MODE ONLY ENABLED': ""} ${
                err.message
            }`
        }
        // return{
        //     code: err.code,
        //     message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED" : ""}
        //         ${err.message}
        //     `
        // }
    }else{
        console.error(err)
        return {
            code: "ERROR",
            message: "Upss hubo un error, intenta más tarde.."
        }
    }
}

export const authenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shape_errors)
    .handler(async() => {
        const user = await assertAuthenticated()
        return {user}
    })

export const unauthenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shape_errors)
    .handler(async() => {
        
    })
    