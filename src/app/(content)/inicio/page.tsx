'use client'

import { easeIn, motion } from "framer-motion";
import GridComponent from "./_components/grid-routes";
import HomeWelcomeComponent from "./_components/welcome";

export default function Homepage(){
    return (
        <div className="">
            <div className="bg-cyan-900 h-20" />

            <div className="-translate-y-1/2">
                <HomeWelcomeComponent />
            </div>
            <div className="mt-4 px-2">
                <GridComponent />
            </div>
        </div>
    )
}