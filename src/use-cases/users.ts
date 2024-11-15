import { createAccount } from "../data-access/account"
import { createProfile } from "../data-access/profiles"
import { createUser, getUserByEmail, verifyPassword } from "../data-access/users"
import { LoginError } from "./errors"

export const userRegistrationUseCase = async(email:string,password:string,name:string,lastName:string) => {
    const prevUser = await getUserByEmail(email)
    if(prevUser){
        throw new Error("Ya existe un usuario registrado con este correo")
    }
    const user = await createUser(email)
    const account = await createAccount(user.id, password)
    const profile = await createProfile(user.id, name,lastName)
    
    return {id:user.id}
}


export const userLoginUseCase = async(email:string,password:string) => {
    const user = await getUserByEmail(email)
    if(!user){
        throw new LoginError()
    }
    const isValidPassword = await verifyPassword(email, password)
    if(!isValidPassword){
        throw new LoginError()
    }

    return { id: user.id}
}