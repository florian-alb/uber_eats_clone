import {atom} from "jotai/index";
import {Item} from "@/components/navbar/Navbar.tsx";
import {useAtom} from "jotai";


export const cartAtom = atom(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : [] as Item[])

export default function ProductsInfos(){
    const [items, ] = useAtom(cartAtom)

    return (
        items.map((item: Item, index : number) => {
            return (
                <div key={index} className="flex items-center py-1  hover:duration-500 ">
                    <div className="flex gap-2 items-center">
                        <img src={item.image ? item.image : '/src/assets/svg/food0.jpeg'} alt={item.name}
                             className="w-16 h-16 object-cover rounded-lg"/>
                        <div className="text-gray-500">{item.quantity}x</div>
                        <h2 className="font-medium text-black">{item.name}</h2>
                        <div className="text-black font-medium">{item.price}$</div>
                    </div>
                </div>
            )
        })
    )
}