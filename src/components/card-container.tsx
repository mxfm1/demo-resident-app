export default function CardContainer({children,title}:{children:React.ReactNode, title:string}){
    return (
        <div className="p-6 bg-white border rounded-lg">
            <h1 className="text-3xl text-center font-[300]">{title}</h1>
            <p>Busca si es que la casa no existe aún..</p>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}