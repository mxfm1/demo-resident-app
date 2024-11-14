'use server'
import { HouseType, queryGetDirectoriesDataProps } from "@/lib/types"
import { getDirectoryInfoUseCase } from "@/use-cases/house"

export const queryGetDirectoriesData = async({pageParam,search}:queryGetDirectoriesDataProps) : Promise<HouseType[]> => {
    try{
        if(process.env.NODE_ENV !== 'production'){
            await new Promise((resolve) => setTimeout(resolve,1000))
        }
        const data = await getDirectoryInfoUseCase({pageParam,search})
        return data
    }
    catch(error){
        if (process.env.NODE_ENV === "production") {
            throw new Error(
              "Upss, hubo un error al cargar el directorio. Por favor, intenta más tarde."
            )
          }
        console.error("DIRECTORIES FETCHING ERROR", error)
        throw error
    }
}
