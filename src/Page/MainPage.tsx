import ShopCard from "@/components/ShopCard.tsx";
import {lazy, Suspense, useEffect, useState} from "react";

const Navbar = lazy(() => import("@/components/Navbar.tsx"));
import {Loader2} from 'lucide-react';

export const Icons = {
    spinner: Loader2,
};


export default function MainPage() {

    type cardShop = {
        name: string
        email: string
        image: string
        id: string
    }

    const [cardData, setCardData] = useState([] as cardShop[])

    useEffect(() => {
        fetch(`http://localhost:8080/shop/`)
            .then(res => res.json())
            .then(({data}) => {
                setCardData(data)
            })
    }, [])

    function displayCard() {

        if (!cardData) {
            return <h1>Failed To fetch the API</h1>
        }

        const cardList = []
        console.log(cardData)

        for (let i = 0; i < cardData.length; i++) {
            cardList.push(<ShopCard picture={cardData[i].image ? cardData[i].image : '/src/assets/svg/food0.jpeg'}
                                    name={cardData[i].name ? cardData[i].name : "Null"}
                                    category={cardData[i].email ? cardData[i].email : "Null"} key={i} uuid={cardData[i].id}></ShopCard>)
        }
        return cardList
    }

    if (!cardData) {
        return (<div className="flex w-full h-full justify-center flex-col items-center">
            <h1 className="text-4xl font-bold">Welcome To Uber Eat</h1>
            <Icons.spinner className="h-24 w-24 stroke animate-spin"/>
        </div>)
    }
    return (
        <>
            <Suspense fallback={
                <div className="flex w-full h-full justify-center flex-col items-center">
                    <h1 className="text-4xl font-bold">Welcome To Uber Eat</h1>
                    <Icons.spinner className="h-24 w-24 stroke animate-spin"/>
                </div>
            }>
                <Navbar/>
            </Suspense>
            <div className="flex justify-center">
                <div className=" w-3/4 h-full gap-4 mt-52 flex flex-wrap justify-center">
                    {displayCard()}
                </div>
            </div>
        </>
    )
}
