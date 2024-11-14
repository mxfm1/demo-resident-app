'use client'

import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { motion } from "framer-motion"

export const CustomBentoGrid = ({
    className,children
}:{
    className?:string,
    children?:ReactNode
}) => {
    return (
        <div className={cn(
            "grid md:auto-rows-[8rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
            className
        )}>
            {children}
        </div>
    )
}

type CustomBentoGridProps = {
    className?:string
    title?:string
    description?:string,
    image?: string | ReactNode,
    icon?: ReactNode;
    href?: string
    index: number
}

export const CustomBentoGridItem = ({className, title,description,image,icon,href,index}:CustomBentoGridProps) => {

    const router = useRouter()

    const redirectFn = () => {
        if(href){
            router.push(href)
        }
    }
    return (
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{
                delay: index * 0.15
            }}
        className={cn(
            "cursor-pointer group row-span-1 relative rounded-xl hover:shadow-2xl shadow-input p-4 bg-slate-100 border-transparent flex justify-between flex-col hover:bg-cyan-900 hover:text-white", className
        )}
            onClick={redirectFn}
        >
            {image}
            <div className="group-hover:translate-x-3 transition duration-300">
                <div className="flex gap-2 font-serif font-bold  mb-1 mt-1 text-xl ">
                    {title}
                    {icon}
                </div>
                <div className="font-sans font-light text-md">
                    {description}
                </div>
            </div>
            <ArrowRight 
                className="absolute top-1/2 right-4 -translate-y-1/2 group-hover:block hidden transition-all  text-white"
                size={24}
            />
        </motion.div>
    )
}