export class PublicError extends Error{
    constructor(message: string){
        super(message)
    }
}

export class LoginError extends PublicError{
    constructor(){
        super("Correo o contraseña inválidos"),
        this.name =  "LoginError"
    }
}

export class ProfileError extends PublicError{
    constructor(){
        super("Hubo un error al cargar los datos del perfil. Porfavor intenta nuevamente más tarde..")
        this.name = "LoadProfileError"
    }
}

export class PropertyAvaliability extends PublicError{
    constructor(){
        super("Esta propiedad ya está en uso")
        this.name = 'AvaliabilityProperty'
    }
}

export class HouseFound extends PublicError{
    constructor(){
        super("Esta propiedad ya existe. Si deseas hacer modificaciones, debes ir a la sección pertinente..")
        this.name = "HouseFound"
    }
}

export class ResidentLimitExceeded extends PublicError{
    constructor(){
        super("Solo se puede registrar 2 residentes por propiedad..")
        this.name = "ResidentLimitExceeded"
    }
    
}

// ERRORES GENERALES

const AUTHENTICATION_ERROR_MESSAGE = 'Debes iniciar sesión para ver este contenido..'

export const AuthenticationError = class AuthenticationError extends Error{
    constructor(){
        super(AUTHENTICATION_ERROR_MESSAGE)
        this.name="AuthenticationError"
    }
}
