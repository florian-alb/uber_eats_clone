import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx";


export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    menuId: string | null;
    orderId: string | null;
    shopId: string;
    quantity: number;
}


export default function ProductCard({product, addToCart}: { product: Product, addToCart: () => void}) {
    return (
        <Dialog>
            <DialogTrigger>
                <div>
                    <img src={product.image ? product.image : "/assets/svg/food0.jpeg"} alt={product.name}
                         className="w-48 h-48 object-cover rounded-xl"/>
                    <div className="flex flex-col text-start">
                        <h1 className="text-l font-medium">{product.name}</h1>
                        <p className="text-gray-800 font-normal">{product.price} $</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="mt-20 max-w-6xl bg-white h-full pt-20">
                <div className="flex">
                    <img src={product.image ? product.image : "/assets/svg/food0.jpeg"} alt={product.name}
                         className="w-1/2 h-1/2 object-cover"/>
                    <DialogHeader className="ml-4 flex gap-1 w-full">
                        <DialogTitle className="text-4xl">{product.name ? product.name : "No name found"}</DialogTitle>
                        <div className="text-gray-700 text-lg font-bold">{product.price ? (product.price) + "$" : "No Price Found"}</div>
                        <DialogDescription className="text-base">{product.description ? product.description : "No Description found"}</DialogDescription>
                        <DialogClose asChild>
                            <Button type='submit' onClick={() => addToCart()} className="bg-ub-dark px-10 py-7 w-full text-white rounded-xl hover:bg-gray-800 text-lg">En ajouter 1 à la commande  •  {product.price}$</Button>
                        </DialogClose>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    )

}