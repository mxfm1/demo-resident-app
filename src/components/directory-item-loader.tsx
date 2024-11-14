import { Loader2, Loader2Icon } from "lucide-react";
import { RefObject } from "react";

export default function DirectoryItemLoader({loaderRef}:{loaderRef: (node: HTMLDivElement | null) => void}){
    return (
        <div className="w-full flex justify-center mt-10 mb-3" ref={loaderRef}>
            <Loader2Icon className="animate-spin text-cyan-900"size={32}/>
        </div>
    )
}