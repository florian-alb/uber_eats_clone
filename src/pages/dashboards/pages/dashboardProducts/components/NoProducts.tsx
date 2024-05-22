import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useProductStore} from "@/store/product.ts";

export default function NoProducts() {
    const productStore = useProductStore()
    const navigate = useNavigate()

    function addProduct() {
        productStore.removeProduct()
        navigate("./edit")
    }

    return (
        <div
            className="flex items-center justify-center rounded-lg border border-dashed shadow-sm size-full p-4"
        >
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    Vous n'avez pas de produits
                </h3>
                <p className="text-sm text-muted-foreground">
                    Vous pouvez commencer à vendre dès que vous ajoutez un produit.
                </p>
                <Button onClick={addProduct} className="mt-4">Ajouter un produit</Button>
            </div>
        </div>
    )
}