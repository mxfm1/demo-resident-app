"use client";
 
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
 
export function HeroSection(){
    return (
        <div className="bg-gradient-to-tr from-slate-400 to-white h-screen">
            <motion.div
            initial={{
                opacity:0, y:40
            }}
            whileInView={{opacity:1, y:-10}}
            transition={{
                delay:0,
                duration:0.8,
                ease: "easeInOut"
            }}
            className="relative flex flex-col gap-4 items-center justify-center pt-28"
        >
            <h2 className="text-3xl md:text-7xl font-bold text-center bg-gradient-to-b from-black to-cyan-900 text-transparent bg-clip-text">
                Applicación <br/> Condominio feliz
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 text-center">Registra y consulta toda la información respecto a los residentes del condominio..</p>

           <Link href="/login">
                <Button
                    className="flex bg-cyan-900 text-white hover:bg-cyan-700 transition-all hover:-translate-y-1 mt-16 ">
                    Empezemos
                    <ArrowRight />
                </Button>
                </Link>
        </motion.div>
        </div>
    )
}