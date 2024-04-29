import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {CircleMinus, SearchIcon} from "lucide-react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Link} from "react-router-dom";

//Utils Jotai
import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";

export type Item = {
    name: string
    price: string
    quantity: number
}

const localCart = atomWithStorage('cart', [] as Item[])

export default function Navbar() {

    const [items, setItems] = useAtom(localCart)


    function GetTotalPrice(): number {
        let total = 0
        for (let i = 0; i < items.length; i++) {
            total += parseFloat(items[i].price)
        }
        return total
    }

    function deleteItem(index: number) {
        return () => {
            const newItems = [...items] //make a copy of the array since we can't mutate the state directly
            newItems.splice(index, 1)
            setItems(newItems)
        }
    }

    function cartContent() {
        if (items.length === 0) return <div>Votre panier est vide !</div>;
        console.log(items)
        return (
            <>
                <div className="flex justify-between ">
                    <div className="text-black font-bold">{items.length} article</div>
                    <div className="text-black">
                        Sous-total: <span className="text-black font-medium">{GetTotalPrice()}$</span></div>
                </div>
                <div className="overflow-scroll mb-20 border-y-2 py-2 flex flex-col gap-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-1  hover:duration-500 ">
                            <div className="flex gap-2">
                                <h2 className="font-medium text-black">{item.name}</h2>
                                <div className="flex justify-center text-gray-900">{item.price} $</div>
                            </div>
                            <CircleMinus onClick={deleteItem(index)}
                                         className="hover:text-red-700 duration-300"></CircleMinus>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div className="w-full h-16 flex items-center justify-between px-10 py-5 text-2xl fixed z-20 bg-white">
            <div className="flex">
                <Sheet>
                    <SheetTrigger>
                        <img src="/src/assets/svg/burger-menu.svg" alt="menu"
                             className="min-w-6 min-h-6 w-6 h-6 bold mt-1"/>
                    </SheetTrigger>
                    <SheetContent className="bg-white border-none pt-14" side={"left"}>
                        <SheetHeader>
                            <Button asChild
                                    className="rounded-xl min-h-14 py-5 mx-5 bg-black text-white text-lg hover:bg-gray-950 duration-200">
                                <Link to={"/register"}>Inscription</Link>
                            </Button>
                            <Button asChild
                                    className="rounded-xl min-h-14 py-5 mx-5 bg-gray-200 text-lg duration-200 hover:bg-gray-300 mt-20">
                                <Link to={"/login"}>Connexion</Link>
                            </Button>
                            <SheetDescription className="flex flex-col gap-5 py-5 font-medium">
                                <a className="hover:underline" href="#">Créez un compte professionnel</a>
                                <a className="hover:underline" href="#">Ajoutez votre restaurant</a>
                                <a className="hover:underline" href="#">Devenez coursier-partenaire</a>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Link to="/" className="ml-5 tracking-tight font-medium">Uber<span
                    className="ml-2 font-bold">Eats</span>
                </Link>
            </div>
            <ToggleGroup type={"single"} className="flex bg-gray-300 rounded-full px-5 mx-5 h-10">
                <ToggleGroupItem className="text-gray-500 aria-checked:font-bold size-fit p-1 rounded-full min-w-28"
                                 value="Livraison">Livraison</ToggleGroupItem>
                <ToggleGroupItem className="text-gray-500 aria-checked:font-bold size-fit p-1 rounded-full min-w-28"
                                 value="emporter">À emporter</ToggleGroupItem>
            </ToggleGroup>
            <div className="flex content-between gap-5 w-full">

                <Input type="text"
                       className="DeliverPosition flex items-center w-full max-w-64 rounded-full px-10   border-none font-medium"/>
                <img src="/src/assets/svg/map.svg" alt="location"
                     className="absolute mt-2 mx-2 min-w-6 min-h-6 w-6 h-6 gree"/>

                <div className="min-w-96 w-full mx-5">
                    <SearchIcon className="w-4 h-4 mt-3 ml-4 absolute"/>
                    <Input type="text" placeholder="Rechercher dans Uber Eats"
                           className="w-full max-w-screen-2xl rounded-full pl-10 placeholder:text-gray-500 border-none bg-gray-300"/>
                </div>

            </div>
            <Popover>
                <PopoverTrigger className="flex">
                    <img src="/src/assets/svg/cart.svg" alt="search"
                         className="min-w-6 min-h-6 max-h-8 max-w-8 rounded-full"/>
                    <div
                        className="absolute min-w-4 mx-6 max-h-5 bg-ub-green top-3 rounded-full text-white text-xs flex justify-center items-center">{items.length}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="mt-2.5 rounded-l bg-white h-1/4 w-full min-w-96 overflow-scroll">
                    <div className="text-center text-gray-500">
                        {cartContent()}
                    </div>
                    {items.length > 0 &&
                        <div className="absolute left-0 bottom-0 h-24  w-full flex justify-center  bg-white">
                            <div className="flex text-gray-900 justify-between w-full mx-10">
                                <div className="">Sous-total:</div>
                                <div className="text-black font-medium">{GetTotalPrice()} $</div>
                            </div>
                            <Button asChild
                                    className="bg-black text-white rounded w-4/5 absolute bottom-0 mx-4 h-12 hover:bg-ub-dark"><Link
                                to={"/checkout"} className="text-ub-dark">Commander</Link></Button>
                        </div>
                    }

                </PopoverContent>
            </Popover>
            <div className="flex gap-2 mx-5">
                <Button asChild className="rounded-full hover:bg-gray-200">
                    <Link to={"/login"}>Connexion</Link>
                </Button>
                <Button asChild className="rounded-full bg-gray-100 hover:bg-gray-200">
                    <Link to={"/register"}>Inscription</Link>
                </Button>
            </div>
        </div>
    )
}