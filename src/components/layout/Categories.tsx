import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CategoryItem from "@/components/layout/CategoryItem.tsx";

export type Category = {
    label: string,
    img: string,
    slug: string
};

export default function Categories(): JSX.Element {

    const categories: Category[] = [
        {
            label: "asian",
            img: 'src/assets/categories/asian.png',
            slug: "/asian"
        },
        {
            label: "bakery",
            img: 'src/assets/categories/bakery.png',
            slug: "/bakery"
        },
        {
            label: "breakfast",
            img: 'src/assets/categories/breakfast.png',
            slug: "/breakfast"
        },
        {
            label: "bubble-tea",
            img: 'src/assets/categories/bubble-tea.png',
            slug: "bubble-tea"
        },
        {
            label: "caribbean",
            img: 'src/assets/categories/caribbean.png',
            slug: "/caribbean"
        },
        {
            label: "chinese",
            img: 'src/assets/categories/chinese.png',
            slug: "/chinese"
        },
        {
            label: "coffee",
            img: 'src/assets/categories/coffee.png',
            slug: "/coffee"
        },
        {
            label: "desert",
            img: 'src/assets/categories/dessert.png',
            slug: "/desert"
        },
        {
            label: "fastfood",
            img: 'src/assets/categories/fastfood.png',
            slug: "/fastfood"
        },
        {
            label: "greek",
            img: 'src/assets/categories/greek.png',
            slug: "/greek"
        },
        {
            label: "grocery",
            img: 'src/assets/categories/grocery.png',
            slug: "/grocery"
        },
        {
            label: "halal",
            img: 'src/assets/categories/halal.png',
            slug: "/halal"
        },
        {
            label: "hawaiian",
            img: 'src/assets/categories/hawaiian.png',
            slug: "/hawaiian"
        },
        {
            label: "healthy",
            img: 'src/assets/categories/healthy.png',
            slug: "/healthy"
        },
        {
            label: "indian",
            img: 'src/assets/categories/indian.png',
            slug: "/indian"
        },
        {
            label: "italian",
            img: 'src/assets/categories/italian.png',
            slug: "/italian"
        },
        {
            label: "korean",
            img: 'src/assets/categories/korean.png',
            slug: "/korean"
        },
        {
            label: "pizza",
            img: 'src/assets/categories/pizza.png',
            slug: "/pizza"
        },
        {
            label: "poke",
            img: 'src/assets/categories/poke.png',
            slug: "/poke"
        },
        {
            label: "salad",
            img: 'src/assets/categories/salad.png',
            slug: "/salad"
        },
        {
            label: "sandwich",
            img: 'src/assets/categories/sandwich.png',
            slug: "/sandwich"
        },
        {
            label: "sushi",
            img: 'src/assets/categories/sushi.png',
            slug: "/sushi"
        },
        {
            label: "thai",
            img: 'src/assets/categories/thai.png',
            slug: "/thai"
        }
    ]

    return (
        <div className={"container w-full flex justify-center my-2"}>
            <Carousel opts={{
                align: "start",
                slidesToScroll: "auto"
            }} className="w-full mx-20">
                <CarouselContent>
                    {categories.map((i) => (
                        <CategoryItem
                            key={i.label}
                            label={i.label}
                            img={i.img}
                            slug={i.slug}
                        />
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}