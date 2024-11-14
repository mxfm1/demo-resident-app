import { PublicError} from "@/lib/errors"
import { ProfileError } from "@/use-cases/errors"
import ErrorClientDisplay from "./client-error-display"

type ErrorComponentProps = {
    error: Error | PublicError | ProfileError | unknown
}

export const ErrorComponent = ({error}:ErrorComponentProps) => {
    if(error instanceof ProfileError){
        return <ErrorClientDisplay message={error.message}/>
    }
}
