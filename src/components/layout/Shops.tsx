import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ShopCard from "@/components/layout/ShopCard.tsx";

export type cardShop = {
    name: string
    email: string
    image: string
    id: string
}


export default function Shops(): JSX.Element {
    const [cardData, setCardData] = useState([] as cardShop[])
    const {categoryId} = useParams();

    useEffect(() => {
        fetch(categoryId ? `http://localhost:8080/shop/category/${categoryId}` : 'http://localhost:8080/shop')
            .then(res => res.json())
            .then(({data}) => {
                setCardData(data)
            })
    }, [])

    if (!cardData) {
        return <h1>Failed To fetch the API</h1>
    }
    if (cardData.length === 0) {
        return (
            <div className={"flex flex-col items-center justify-center"}>
                <p>No shops in this category</p>
                <a className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 rounded-full bg-green-500 hover:bg-green-500/50"
                   href="/">Back to homepage</a>
            </div>
        )
    }
    return (
        <div className="flex flex-wrap gap-4 gap-y-32">
            {
                cardData.map(card => {
                    return (
                        <ShopCard picture={card.image ? card.image : '/src/assets/svg/food0.jpeg'}
                                  name={card.name ? card.name : "Null"}
                                  category={card.email ? card.email : "Null"}
                                  key={card.id}
                                  uuid={card.id}
                        />
                    )
                })}
        </div>
    )
}