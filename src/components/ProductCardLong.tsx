import {CardTitle} from "@/components/ui/card.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";


type Product = {
    name: string
    description: string
    price: number
    image: string
}

export default function ProductCardLong({product} : {product:Product}) {
    return (
        <Dialog>
            <DialogTrigger className="w-5/12 max-w-3xl flex justify-between min-w-92 border-gray-200 border rounded-xl">
                <div className="flex flex-col text-start my-2 ml-5">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-gray-800 text-sm">{product.price} $</p>
                    <p className="text-sm text-gray-500">{product.description ? product.description : "No description included !"}</p>
                </div>
                <div className="relative">
                    <img src={product.image ? product.image : "/src/assets/svg/food0.jpeg"} alt="No Picture Found" className="max-w-44 object-contain rounded-r-xl"/>
                    <Button className="bg-white text-ub-dark rounded-full hover:bg-gray-200 absolute bottom-2 right-2" size="icon">
                        <Plus size={20}/>
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="mt-20 max-w-6xl bg-white h-full pt-20">
                <div className="flex">
                    <img src={product.image ? product.image : "/src/assets/svg/food0.jpeg"} alt={product.name}
                         className="w-1/2 h-1/2 object-cover"/>
                    <DialogHeader className="ml-4 flex gap-1">
                        <DialogTitle className="text-4xl">{product.name ? product.name : "No name found"}</DialogTitle>
                        <div className="text-gray-700 text-lg font-bold">{product.price ? (product.price) + "$" : "No Price Found"}</div>
                        <DialogDescription className="text-base">{product.description ? product.description : "No Description found"}</DialogDescription>
                        <Button type='submit' className="bg-ub-dark px-10 py-7 w-full text-white rounded-xl hover:bg-gray-800 text-lg">En ajouter 1 à la commande  •  {product.price}$</Button>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    )
}