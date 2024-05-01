import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar.tsx";
import ProductCard from "@/components/ProductCard.tsx";
import ProductCardLong from "@/components/ProductCardLong.tsx";
import {Icons} from "@/pages/home";
import {useParams} from "react-router-dom";



type Category = {
    name: string
    image: string
}

type products = {
    name: string
    description: string
    price: number
    image: string
}

type Shop = {
    name: string,
    id: string
    image: string,
    Category: Category
    products: products[]
}


export default function Shop() {

    const shopID = useParams()
    console.log(shopID)
    const [shopInfo, setShopInfo] = useState<Shop | undefined>(undefined)

    useEffect(() => {
        retrieveShopInfo().then(r => r)
    }, [])

    async function retrieveShopInfo() {
        await fetch(`http://localhost:8080/shop/${shopID.id}`)
            .then(res => res.json())
            .then(({data}) => {
                if (!data) {
                    return
                }
                setShopInfo(data)
            })
    }



    if (!shopInfo) return (
        <div className="flex w-full h-full justify-center flex-col items-center">
            <Icons.spinner className="h-24 w-24 stroke-1 text-ub-green animate-spin"/>
        </div>
    )

    return (
        <>
            <Navbar/>
            <div className="px-9 pt-20 min-w-screen m-auto h-auto">
                <img
                    src={shopInfo.image ? "https://i.pinimg.com/originals/2b/8d/34/2b8d3481fd0855dfb0608f3198fd8adc.jpg" : ""}
                    alt="No Image Data"
                     className="w-full h-72 object-cover rounded-xl"/>
                <div className="mt-5">
                    <h1 className="text-3xl font-bold">{shopInfo.name ? shopInfo.name : ""}</h1>
                    <p className="text-gray-500">{shopInfo.Category.name ? shopInfo.Category.name : ""}</p>
                </div>
            </div>
            <div className="h-screen size-full px-9 pt-20 min-w-screen m-auto flex">
                <div className='categoryListing w-1/5 h-full bg-gray-100 rounded-xl shadow-2xl'>
                    {
                        // TODO: Add the category listing here
                    }
                </div>
                <div className="productListing w-4/5 h-full">
                    <div className="font-medium text-2xl m-12">Article en vedettes</div>
                    <Carousel className="pl-0 pt-5 m-12 max-w-8xl min-w-96">
                        <div >
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                        <CarouselContent key={"carousel"}>
                            {shopInfo.products.map((product, index) => (
                                <CarouselItem className="basis-56"><ProductCard product={product} key={index}></ProductCard></CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="m-12">
                        <div className="font-medium text-2xl mt-24">Tous les articles</div>
                        <div className="flex flex-wrap gap-10 min-w-96">
                            {shopInfo.products.map((product, index) => (
                                <ProductCardLong product={product} key={index}></ProductCardLong>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
