import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel.tsx"
import CategoryItem from "@/pages/home/components/CategoryItem.tsx";
import {useEffect, useState} from "react";

export type Category = {
    id: string,
    name: string,
    icon: string
};

export default function Categories(): JSX.Element {
    const [categories, setCategory] = useState([] as Category[])

    useEffect(() => {
        fetch("http://localhost:8080/category/")
            .then(res => res.json())
            .then(({data}) => {
                setCategory(data)
            })
    }, [])

    return (
        <div className={"container w-full flex justify-center mt-2 mb-6"}>
            <Carousel opts={{
                align: "start",
                slidesToScroll: "auto"
            }} className="w-full">
                <CarouselContent>
                    {
                        categories && categories.map((i:Category) => (
                            <CategoryItem
                                key={i.id}
                                name={i.name}
                                icon={i.icon}
                                id={i.id}
                            />
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute start-0 bg-gray-100 border-none size-10 hover:bg-gray-300 active:bg-gray-100 "/>
                <CarouselNext className="absolute end-0 bg-gray-100 border-none size-10 hover:bg-gray-300 active:bg-gray-100 "/>

            </Carousel>
        </div>
    )
}