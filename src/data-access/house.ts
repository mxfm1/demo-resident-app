'use server'
import { database } from "@/db"
import { houses, residents, users } from "@/db/schema"
import { and, eq, ilike } from "drizzle-orm"
import { queryGetDirectoriesDataProps } from "@/lib/types"

export async function getHouseById(houseId:string){
    const house = await database.query.houses.findFirst({
        where: eq(houses.identifier,houseId)
    })
    return house 
}

export async function getHouseByIdentifier(identifier:string){
    const house = await database.query.houses.findFirst({
        where: eq(houses.identifier,identifier)
    })
    return house
}

export async function createNewHouseDirectory(identifier:string){
    const [house] = await database.insert(houses).values({
        identifier: identifier
    }).returning()

    return house;
}

export async function getDirectoryHouses(){
    const directoryHouse = await database.select().from(houses)
    return directoryHouse
}

export async function getDirectoryInformation(){
    const data = await database.select().from(houses)
    .leftJoin(residents,eq(residents.houseId, houses.id))
    return data
}

export async function getAllDirectories({pageParam,search}:queryGetDirectoriesDataProps){
    const DIRECTORIES_PER_PAGE = 6
    const data = await database.query.houses.findMany({
        with:{
            residents: true
        },
        limit: DIRECTORIES_PER_PAGE,
        offset: (pageParam - 1) * DIRECTORIES_PER_PAGE,
        ...(search && {
            where: and(ilike(houses.identifier,`%${search}%`))
        })
    })
    return data
}