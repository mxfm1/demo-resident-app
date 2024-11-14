import crypto from 'crypto'
import { database } from '@/db'
import { accounts } from '@/db/schema'
import { eq } from 'drizzle-orm'

const ITERATIONS = 1000

export const hashPassword = async(plaintextPassword:string,salt:string) => {
    return new Promise((resolve,reject) => {
        crypto.pbkdf2(
            plaintextPassword,
            salt,
            ITERATIONS,
            64,
            "sha512",
            (err,derivedKey) => {
                if(err) reject(err)
                resolve(derivedKey.toString("hex"))
            }
        )
    })
}

export const createAccount = async(userId:number,password:string) => {
    const salt = crypto.randomBytes(128).toString("base64")
    const hashedPassword = await hashPassword(password, salt)
    const [account] = await database.insert(accounts).values({
        userId,
        accountType: 'email',
        password: hashedPassword,
        salt
    }).returning()

    return account
}

export const getAccountByUserId = async(userId:number) => {
    const account = await database.query.accounts.findFirst({
        where: eq(accounts.userId,userId)
    })

    return account
}