import { cookies } from "next/headers"
import { cache} from 'react'
import { createSession, generateSessionToken, validateRequest } from "@/util/auth"
import { AuthenticationError } from "@/use-cases/errors"

const SESSION_COOKIE_NAME = 'session'

export const setSessionCookie = (token:string,expiresAt:Date) => {
    cookies().set(SESSION_COOKIE_NAME,token,{
        httpOnly: true,
        sameSite:'lax',
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path: "/"
    })
}

export const setSession = async(userId:number) => {
    const sessionToken = await generateSessionToken()
    const session = await createSession(sessionToken,userId)
    setSessionCookie(sessionToken,session.expiresAt)
}

export const getCurrentUser = cache(async() => {
    const { user } = await validateRequest();
    return user ?? undefined
})

export const assertAuthenticated = async() => {
    const user = await getCurrentUser()
    if(!user){
        throw new AuthenticationError()
    }
    return user
}

export const getSessionToken = () => {
    return cookies().get(SESSION_COOKIE_NAME)?.value
}