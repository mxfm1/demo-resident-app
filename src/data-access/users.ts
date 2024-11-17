import { database } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getAccountByUserId, hashPassword } from "./account"

export const getUserByEmail = async(email:string) => {
    const user = await database.query.users.findFirst({
        where: eq(users.email,email)
    })

    return user
}

export const createUser = async(email:string) => {
    const [user] = await database.insert(users).values({
        email: email
    }).returning()

    return user
}

export const verifyPassword = async(email:string,plainTextPassword:string) => {
    const user = await getUserByEmail(email)
    if(!user){
        return false
    }
    const account = await getAccountByUserId(user.id)
    if(!account){
        return false
    }

    
    const salt = account.salt
    const password = account.password  

    if(!salt || !password){
        return false
    }

    const hash = await hashPassword(plainTextPassword,salt)
    return account.password == hash
}