'use client'

import { easeIn, motion } from "framer-motion"

export default function HomeWelcomeComponent(){
    return (
        <div 
            className="border p-5 rounded-md shadow-lg bg-white mx-12">
           <h1 className="hover:translate-x-2 text-2xl transition-all font-serif">
                Que quieres hacer?
           </h1>
        </div>
    )
}