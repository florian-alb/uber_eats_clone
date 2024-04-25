import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import Categories from "@/components/layout/Categories.tsx";
import {useEffect, useState} from "react";

export default function MainPage() {

    type cardShop = {
        name: string
        email: string
        image: string
        id: string
    }

    const [cardData, setCardData] = useState([] as cardShop[])

    useEffect(() => {
        fetch("http://localhost:8080/shop/")
            .then(res => res.json())
            .then(({data}) => {
                setCardData(data)
            })
    }, [])

    function displayCard() {

        if (!cardData) {
            return <h1>Failed To fetch the API</h1>
        }

        function ShopCard() {
            return (

                <Card
                    className="min-w-72 max-w-80 max-h-56 bg-white rounded-xl flex flex-col shadow-none relative border-none">
                    <CardHeader className="p-0">
                        <img src="src/assets/svg/food.webp" alt="food" className="max-h-32 rounded-xl object-cover"/>
                    </CardHeader>
                    <CardContent className="">
                        <h1 className="mt-2 text-xl">Buffalo Grill - Toulouse</h1>
                        <p className="text-gray-500">30-45 min</p>
                    </CardContent>
                </Card>

                // <div className="min-w-72 max-w-80 max-h-56 bg-white rounded-xl flex flex-col relative">
                //     <div className="absolute min-w-10 min-h-10">♡</div>
                //     <img src="src/assets/svg/food.webp" alt="food" className="max-w-92 max-h-32 rounded-xl object-cover"/>
                //     <h1 className="mt-2 text-xl">Buffalo Grill - Toulouse</h1>
                //     <p className="text-gray-500">30-45 min</p>
                // </div>
            )
        }


        return (
            <>
                <Categories/>
                <div className="w-full h-full flex justify-center">
                    <div className=" h-full grid grid-cols-4 gap-5 mt-24">
                        <h3 className="col-span-4 text-2xl font-bold">Top picks for you</h3>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                        <ShopCard/>
                    </div>
                </div>
            </>
        )
    }
}
