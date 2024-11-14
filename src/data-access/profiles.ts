import { database } from "@/db"
import { profiles } from "@/db/schema"
import { cache } from "react"
import { getUserByEmail } from "./users"
import { eq } from "drizzle-orm"

export const createProfile = async(userId:number,name:string,lastName:string) => {
    const [profile] = await database.insert(profiles).values({
        userId,
        name,
        lastName
    }).returning()

    return profile
}


export const getProfileInfoById = async(userId:number) => {
    const profile = await database.query.profiles.findFirst({
        where: eq(profiles.userId,userId)
    })

    return profile
}