import { getProfileInfoById } from '@/data-access/profiles'
import { cache } from 'react'
import { ProfileError } from './errors'

export const getProfileDataUseCase = cache(async(userId:number) => {
    // if(process.env.NODE_ENV !== 'production'){
    //     await new Promise((resolve) => setTimeout(resolve,2000))
    // }
    const profile = await getProfileInfoById(userId)
    if(!profile){
        throw new ProfileError()
    }
    return profile
})