import {CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
export default function ShopCard({ picture, name, category, uuid }: { picture: string, name: string, category: string, uuid: string}) {
        return(
            <Link to={`/shop/${uuid}`} className="min-w-72 max-w-72 max-h-32 bg-white rounded-xl flex flex-col shadow-none relative border-none" key={uuid}>
                <CardHeader className="p-0">
                    <img src={picture} alt="food" className="max-h-32 rounded-xl object-cover"/>
                </CardHeader>
                <CardContent className="pl-0">
                    <h1 className="mt-2 text-xl font-normal">{name}</h1>
                    <p className="opacity-70">{category}</p>
                </CardContent>
            </Link>
        )
}