import { createNewHouseDirectory, getHouseByIdentifier } from "@/data-access/house"
import { addHouseResident } from "@/lib/types"
import { ResidentLimitExceeded } from "./errors"
import { getPropertyResidents, registerPropertyResident } from "@/data-access/residents"

export const AddResidentUseCase = async({identifier, name,lastName,email,phone}:addHouseResident) => {
    const house = await getHouseByIdentifier(identifier) || await createNewHouseDirectory(identifier)
    const residents = await getPropertyResidents(house.id)
    if(residents.length >= 2){
        throw new ResidentLimitExceeded()
    }
    const resident = await registerPropertyResident({name,lastName,email,phone,houseId:house.id})
    if(!resident){
        throw new Error("No se pudo crear el registro del residente. Porfavor intenta nuevamente más tarde..")
    }
}
