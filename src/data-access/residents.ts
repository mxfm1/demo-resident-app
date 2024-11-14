'use server'

import { database } from "@/db"
import { residents } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createHouseDirectoryProp } from "@/lib/types"

export const getPropertyResidents = async(houseId:string) => {
    const res = await database.query.residents.findMany({
        where: eq(residents.houseId,houseId)
    })
    return res
}

export const registerPropertyResident = async({name,lastName,email,phone,houseId}:createHouseDirectoryProp) => {
    const [resident] = await database.insert(residents).values({
        name,
        lastName,
        email,
        phone,
        houseId
    }).returning()
    return resident
}