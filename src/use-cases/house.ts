'use server'

import { queryGetDirectoriesDataProps } from "@/lib/types";
import { getAllDirectories, getDirectoryHouses, getDirectoryInformation, getHouseById } from "../data-access/house";
import { createHouseDirectoryProp, PaginatedDirectories} from "@/lib/types";

export const CheckPreviousHouseUseCase = async(houseId:string) => {
    const house  = await getHouseById(houseId)
    return !!house;
}

export const getDirectoryHousesUseCase = async() => {
    const house = await getDirectoryHouses()
    return house
}


export const getDirectoryInfoUseCase = async({pageParam,search}:queryGetDirectoriesDataProps) => {
    const data = await getAllDirectories({pageParam,search});
    return data
}

export const makeApiCallUseCase = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({to: "+56923970823"})
      });
  
      if (!response.ok) {
        throw new Error("Failed to make call");
      }
      
      console.log("RESPONSE", response)
      const result = await response.text();
      console.log("RESULTADO DE LA API EN USE CASE",result);
      return result;
    } catch (error: any) {
      console.error("Error making API call", error);
      return { success: false, message: error.message };
    }
  };
