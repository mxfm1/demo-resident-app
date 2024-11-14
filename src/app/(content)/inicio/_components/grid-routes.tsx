import { CustomBentoGrid, CustomBentoGridItem } from "./custom-grid-item";
import { Book, CarFront, Hammer, House, Truck } from "lucide-react";

const gridItemsData = [
    {
        title: "Directorios",
        description: "Ve el listado de los residentes..",
        icon: <House className="" size={24}/>,
        className: "",
        href: "/directorios"
    },{
        title: "Autos autorizados",
        description: "Visualiza los autos registrados por casa..",
        icon: <CarFront size={28}/>,
    },{
        title: "Bitácora",
        description: "Información importante de turnos previos..",
        icon: <Book className="" size={24}/>,
    },{
        title: "En construcción",
        description: "Feature en contrucción..",
        icon: <Hammer size={24}/>,
    },{
        title: "Encomiendas",
        description : "Revisa y registra las encomiendas de los residentes..",
        icon: <Truck size={24}></Truck>,
    }
]

export default function GridComponent(){
    return (
        <CustomBentoGrid>
            {gridItemsData.map(({title,description,icon:Icon,href},index) => (
                <CustomBentoGridItem
                    className={index == 3 ? "md:col-span-2" : index === 6 ? "md:col-span-2": ""}
                    key={index}
                    title={title}
                    description={description}
                    icon={Icon}
                    href={href}
                    index={index}
                />
            ))}
        </CustomBentoGrid>
    )
}