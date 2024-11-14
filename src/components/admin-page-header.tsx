export default function AdminHeadWrapper({children, title}:{children: React.ReactNode,title:string}){
    return(
        <div className="bg-gradient-to-tr from-slate-400 to-white h-fit">
            <div className="h-20 bg-cyan-900 "/>
            <div className="flex items-center justify-center ">
                <div className="bg-slate-100 py-3 rounded-md shadow-xl -translate-y-[50%] px-4">
                    <h1 className="text-xl md:text-4xl text-center font-serif">{title}</h1>
                </div>
            </div>
            <div className="mx-8 ">
                {children}
            </div>
        </div>
    )
}