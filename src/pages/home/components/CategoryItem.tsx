import {CarouselItem} from "@/components/ui/carousel.tsx";
import {Category} from "@/pages/home/components/Categories.tsx";
import {Link, useParams} from "react-router-dom";

export default function CategoryItem(props: Category): JSX.Element {
    const {categoryId} = useParams();
    return (
        <CarouselItem className="basis-auto pl-6">
            <Link to={`/category/${props.id}`} className={"flex items-center flex-col"}>
                <img className={`w-18 h-20 p-1 mb-1 ${categoryId  === props.id && 'rounded-full bg-yellow-500/50 rotate-20'}`} src={props.icon} alt={props.name}/>
                <p className={"text-xs"}>{
                    props.name.charAt(0).toUpperCase() + props.name.slice(1)
                }</p>
            </Link>
        </CarouselItem>
    )
}