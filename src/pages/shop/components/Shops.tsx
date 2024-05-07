import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ShopCard from "@/components/ShopCard.tsx";
import {getShops} from "@/api/shop.ts";
import {Shop} from "@/types/shop.ts";

export default function Shops(): JSX.Element {
    const [cardData, setCardData] = useState<Shop[]>()
    const {categoryId} = useParams();

    useEffect(() => {
        getShops(categoryId).then(data => setCardData(data))
    }, [categoryId])

    if (!cardData) {
        return <h1>Failed To fetch the API</h1>
    }
    if (cardData.length === 0) {
        return (
            <div className={"flex flex-col items-center justify-center"}>
                <p>No shops in this category</p>
                <Link
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 rounded-full bg-green-500 hover:bg-green-500/50"
                    to="/">Back to homepage</Link>
            </div>
        )
    }
    return (
        <div className="flex flex-wrap gap-4 gap-y-32 w-full basis-3">
            {
                cardData?.map(card => {
                    return (<ShopCard id={card.id} name={card.name} category={card.category} image={card.image} key={card.id}/>)
                })
            }
        </div>
    )
}