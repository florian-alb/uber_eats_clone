import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger,} from "@/components/ui/sheet.tsx"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Link} from "react-router-dom";
import Cart from "@/components/Cart.tsx";
import AddressField from "@/components/navbar/components/AddressField.tsx";
import {useAuthStore} from "@/store/auth.ts";

export type Item = {
    id: string
    name: string
    price: string
    quantity: number
    shopId: string
}

export default function Navbar() {
    const {user, logout} = useAuthStore();

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
                            {!user ? (
                                <>
                                    <Button asChild
                                            className="rounded-xl min-h-14 py-5 mx-5 bg-black text-white text-lg hover:bg-gray-950 duration-200">
                                        <Link to={"/register"}>Inscription</Link>
                                    </Button><Button asChild
                                                     className="rounded-xl min-h-14 py-5 mx-5 bg-gray-200 text-lg duration-200 hover:bg-gray-300 mt-20">
                                    <Link to={"/login"}>Connexion</Link>
                                </Button>
                                </>
                            ) : (
                                <Button onClick={logout}
                                        className="rounded-xl min-h-14 py-5 mx-5 bg-gray-200 text-lg duration-200 hover:bg-gray-300 mt-20">Déconnexion</Button>
                            )}

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
            <div className="flex content-between gap-3 w-full">
                <div className="min-w-96 w-full mx-5 flex">
                    <AddressField/>
                    <Input type="text" placeholder="Rechercher dans Uber Eats"
                           className="w-full max-w-screen-2xl rounded-full pl-10 placeholder:text-gray-500 border-none bg-gray-100"/>
                </div>
            </div>
            <Cart/>
            {!user &&
            <div className="flex gap-2 mx-5">
                <Button asChild className="rounded-full hover:bg-gray-800">
                    <Link to={"/login"}>Connexion</Link>
                </Button>
                <Button asChild className="rounded-full bg-gray-100 hover:bg-gray-200 text-black">
                    <Link to={"/register"}>Inscription</Link>
                </Button>
            </div>
            }
        </div>
    )
}
