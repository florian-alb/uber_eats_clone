import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {SearchIcon} from "lucide-react";

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {Link} from "react-router-dom";
import {useAuth} from "@/middlewares/AuthProvider.tsx";
import Cart from "@/components/Cart.tsx";

export type Item = {
    id: string
    name: string
    price: string
    quantity: number
    shopId: string
}



export default function Navbar() {

    const isLoggedIn = useAuth()
    function logout() {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
            {
                method: 'POST',
                credentials: 'include'
            }
        ).catch(error => console.error("Error when logout ", error)
        ).then(resp => {
            if (&& resp.status === 200){
                window.location.href="/login"
            }
        }).catch(error => console.error("Error when logout ", error))
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
                        {!isLoggedIn?.isLoggedIn ? (
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
                        ) : (<Button onClick={logout}>Logout</Button>)}
                    </SheetContent>
                </Sheet>
                <Link to="/" className="ml-5 tracking-tight font-medium">Uber<span
                    className="ml-2 font-bold">Eats</span>
                </Link>
            </div>
            <ToggleGroup type={"single"} className="flex bg-gray-100 rounded-full px-5 mx-5 h-10">
                <ToggleGroupItem
                    className="text-gray-500 aria-checked:text-gray-800 aria-checked:font-bold size-fit p-1 rounded-full min-w-28"
                    value="Livraison">Livraison</ToggleGroupItem>
                <ToggleGroupItem
                    className="text-gray-500 aria-checked:text-gray-800 aria-checked:font-bold size-fit p-1 rounded-full min-w-28"
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
                           className="w-full max-w-screen-2xl rounded-full pl-10 placeholder:text-gray-500 border-none bg-gray-100"/>
                </div>

            </div>
            <Cart/>
            <div className="flex gap-2 mx-5">
                <Button asChild className="rounded-full hover:bg-gray-800">
                    <Link to={"/login"}>Connexion</Link>
                </Button>
                <Button asChild className="rounded-full bg-gray-100 hover:bg-gray-200 text-black">
                    <Link to={"/register"}>Inscription</Link>
                </Button>
            </div>
        </div>
    )
}
