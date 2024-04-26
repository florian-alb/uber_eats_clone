import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CategoryItem from "@/components/layout/CategoryItem.tsx";
import {useEffect, useState} from "react";

export type Category = {
    id: string,
    name: string,
    icon: string
};

function UberCarouselContent(props: {categories: Category[]}): JSX.Element {
    if (props.categories.length === 0) {
        return <></>
    }
    return (
        <CarouselContent>
            {
                props.categories.map((i:Category) => (
                    <CategoryItem
                        key={i.id}
                        label={i.name}
                        img={i.icon}
                        slug={i.id}
                    />
                ))
            }
        </CarouselContent>
    )
}


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
        <div className={"container w-full flex justify-center my-2"}>
            <Carousel opts={{
                align: "start",
                slidesToScroll: "auto"
            }} className="w-full mx-20">
                <UberCarouselContent categories={categories}/>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}