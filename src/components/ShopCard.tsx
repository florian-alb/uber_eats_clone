import {CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {ShopDisplay} from "@/types/shop.ts";

export default function ShopCard(props: ShopDisplay) {
    return (
        <Link to={`/shop/${props.id}`}
              className="min-w-52 max-h-32 bg-white rounded-xl flex flex-col shadow-none relative md:grow" key={props.id}>
            <CardHeader className="p-0">
                <img src={props.image? props.image: '/public/assets/svg/food0.jpeg'} alt="food" className="max-h-32 rounded-xl object-cover"/>
            </CardHeader>
            <CardContent className="pl-0">
                <h1 className="mt-2 text-xl font-normal">{props.name}</h1>
            </CardContent>
        </Link>
    )
}