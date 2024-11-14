import Link from "next/link"
import { Button } from '../components/ui/button'

export default function NotFounPage(){
    return(
        <div className="bg-gradient-to-tr from-slate-400 to-white h-screen">
        <div className="relative flex flex-col gap-4 items-center justify-center pt-28" >
        <h2 className="text-3xl md:text-7xl text-[60px] text-center bg-gradient-to-b from-black to-cyan-900 text-transparent bg-clip-text pb-7">
            Hubo un Problema
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-xl text-neutral-500 text-center pt-12">No pudimos encontrar la página que estás buscando
        </p>
        <p className="text-neutral-500 text-sm md:text-lg font-[300]">Para volver al incio <Link className="underline text-cyan-900" href="/"> clickea aqui</Link></p>

        <img src="/not-found-no-border.svg
        " alt="" />
    </div>
    </div>
    )
}