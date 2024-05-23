import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {atom, useAtom} from "jotai/index";
import {CircleMinus} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Item} from "@/components/navbar/Navbar.tsx";

export const cartAtom = atom(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [] as Item[])


export default function Cart() {

    const [cart, setCart] = useAtom(cartAtom)
    function getTotalPrice(): string {
        let total = 0
        for (let i = 0; i < cart.length; i++) {
            total += parseFloat(cart[i].price) * cart[i].quantity
        }
        return total.toFixed(2)
    }

    function getNumberOfProducts(items: Item[]): number {
        let total = 0
        for (let i = 0; i < items.length; i++) {
            total += items[i].quantity
        }
        return total
    }

    function deleteItem(index: number) {
        return () => {
            const newItems = [...cart]; // make a copy of the array since we can't mutate the state directly

            if (newItems[index].quantity > 1) {
                newItems[index].quantity -= 1;
            } else {
                newItems.splice(index, 1);
            }

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(newItems));
            setCart(newItems);
        };

    }

    function cartContent() {
        if (getNumberOfProducts(cart) == 0) return <div>Votre panier est vide !</div>;
        return (
            <>
                <div className="flex justify-between ">
                    <div className="text-black font-bold">{getNumberOfProducts(cart)} article</div>
                    <div className="text-black">
                        Sous-total: <span className="text-black font-medium">{getTotalPrice()}$</span></div>
                </div>
                <div className="overflow-scroll mb-20 border-y-2 py-2 flex flex-col gap-3">

                    {cart.map((item : Item, index: number) => (
                        <div key={index} className="flex justify-between items-center py-1  hover:duration-500 ">
                            <div className="flex gap-2">
                                <div className="text-gray-500">{item.quantity}x</div>
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
            <Sheet>
                <SheetTrigger className="flex">
                    <img src="/public/assets/svg/cart.svg" alt="search"
                         className="min-w-6 min-h-6 max-h-8 max-w-8 rounded-full"/>
                    <div
                        className="absolute min-w-4 mx-6 max-h-5 bg-ub-green top-3 rounded-full text-white text-xs flex justify-center items-center">{getNumberOfProducts(cart)}
                    </div>
                </SheetTrigger>
                <SheetContent className="bg-white w-full min-w-96 overflow-scroll">
                    <div className="font-semibold    text-4xl">
                        {cart[0] && cart[0].shopName}
                    </div>
                    <div className="text-center text-gray-500 mt-10">
                        {cartContent()}
                    </div>
                    {getNumberOfProducts(cart) > 0 &&
                        <div className="absolute left-0 bottom-8 h-24 w-full flex justify-center  bg-white">
                            <div className="flex text-gray-900 justify-between w-full mx-10">
                                <div className="">Sous-total:</div>
                                <div className="text-black font-medium">{getTotalPrice()} $</div>
                            </div>
                            <Button asChild
                                    className="bg-black text-white rounded w-4/5 absolute bottom-0 mx-4 h-12 hover:bg-ub-dark"><Link
                                to={"/checkout"} className="text-ub-dark">Commander</Link></Button>
                        </div>
                    }
                </SheetContent>

            </Sheet>





            // <Popover>
            //     <PopoverTrigger className="flex">
            //         <img src="/public/assets/svg/cart.svg" alt="search"
            //              className="min-w-6 min-h-6 max-h-8 max-w-8 rounded-full"/>
            //         <div
            //             className="absolute min-w-4 mx-6 max-h-5 bg-ub-green top-3 rounded-full text-white text-xs flex justify-center items-center">{getNumberOfProducts(items)}
            //         </div>
            //     </PopoverTrigger>
            //     <PopoverContent className="mt-2.5 rounded-xl bg-white h-1/4 w-full min-w-96 overflow-scroll">
            //         <div className="text-center text-gray-500">
            //             {cartContent()}
            //         </div>
            //         {getNumberOfProducts(items) > 0 &&
            //             <div className="absolute left-0 bottom-0 h-24  w-full flex justify-center  bg-white">
            //                 <div className="flex text-gray-900 justify-between w-full mx-10">
            //                     <div className="">Sous-total:</div>
            //                     <div className="text-black font-medium">{getTotalPrice()} $</div>
            //                 </div>
            //                 <Button asChild
            //                         className="bg-black text-white rounded w-4/5 absolute bottom-0 mx-4 h-12 hover:bg-ub-dark"><Link
            //                     to={"/checkout"} className="text-ub-dark">Commander</Link></Button>
            //             </div>
            //         }
            //
            //     </PopoverContent>
            // </Popover>
        )
}
