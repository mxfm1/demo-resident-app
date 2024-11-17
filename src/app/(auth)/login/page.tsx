import { getCurrentUser } from "@/lib/session";
import LoginForm from "./_components/login-form";
import LoginFormWrapper from "./_components/login-wrapper";
import { redirect } from "next/navigation";

export default async function LoginPage(){

    const user = await getCurrentUser()
    if(user){
        return redirect("/inicio")
    }
    return (
        <LoginFormWrapper>
            <LoginForm />
        </LoginFormWrapper>
    )
}