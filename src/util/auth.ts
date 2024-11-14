import crypto from 'crypto'
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase} from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'
import { database } from '@/db'
import { sessions, users } from '@/db/schema'
import { getSessionToken } from '@/lib/session'
import { eq } from 'drizzle-orm'


const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2

export const generateSessionToken = () => {
    const bytes = new Uint8Array(20)
    crypto.getRandomValues(bytes)
    const token = encodeBase32LowerCaseNoPadding(bytes)
    console.log("SESSION TOKEN GENERATED",token)
    return token
}

export const createSession = async(token:string,userId:number) => {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    const session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS)
    }
    console.log("SESSION ID GENERATED", sessionId)
    await database.insert(sessions).values(session)
    return session
} 

export const validateRequest = async() => {
    const sessionToken = getSessionToken()
    if(!sessionToken){
        return { session: null, user: null}
    }
    return validateSessionToken(sessionToken)
}

export const validateSessionToken = async(token:string) => {
    // desencripto el token para obtener el sessionId
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
    // Verificar si el session id existe en al base de datos
    const sessionInBD = await database.query.sessions.findFirst({
        where: eq(sessions.id, sessionId)
    })
    // Validar si el session ID existe
    if(!sessionInBD){
        return { session:null, user: null}
    }
    // Validar que el token no esté expirado
    if(Date.now() >= sessionInBD.expiresAt.getTime()){
        await database.delete(sessions).where(eq(sessions.id, sessionInBD.id));
        return { session: null, user: null}
    }
    // Buscar el usuario con el session id del token, en caso que no exista, borrar el registro de la session id referente al usuario
    const user = await database.query.users.findFirst({
        where: eq(users.id, sessionInBD.userId),
    });

    if(!user){
        await database.delete(sessions).where(eq(sessions.id, sessionInBD.id))
        return { session: null, user: null}
    }

    if(Date.now() >= sessionInBD.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS){
        sessionInBD.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
        await database.update(sessions).set({
            expiresAt: sessionInBD.expiresAt
        })
        .where(eq(sessions.id, sessionInBD.id));
    }

    return { session: sessionInBD, user}
}

export const invalidateSession = async(sessionId:string) => {
    await database.delete(sessions).where(eq(sessions.id,sessionId))
}