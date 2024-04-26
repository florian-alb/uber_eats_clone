import {CarouselItem} from "@/components/ui/carousel.tsx";
import {Category} from "@/components/layout/Categories.tsx";

export default function CategoryItem(props: Category): JSX.Element {
    return (
        <CarouselItem className="basis-auto pl-3 flex items-center flex-col">
            <img className={"w-16 h-18"} src={props.img} alt={props.label}/>
            <p className={"text-xs"}>{props.label}</p>
        </CarouselItem>
    )
}