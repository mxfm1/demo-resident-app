'use server'

import { pg } from '../index'
import { userRegistrationUseCase } from '@/use-cases/users'
import fs from 'fs'
import path from 'path'

const userCreate = async() => {
    try{
        const dataPath = path.resolve(__dirname,'data.json')
        const data = JSON.parse(fs.readFileSync(dataPath,'utf-8'))

        for(const user of data){
            const {email,password,name,lastName} = user
            await userRegistrationUseCase(email,password,name,lastName)
        }

        console.log("SEEDING COMPLETED SUCCESSFULLY")
    }catch(error){
        console.log("HUBO UN ERROR AL EJECUTAR EL SEEDING", error)
    }finally{
        await pg.end()
    }    
}

userCreate()