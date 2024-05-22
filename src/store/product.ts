import {Product} from "@/types/product.ts";
import {create} from "zustand";
import {getProduct, removeProduct, setProduct} from "@/utils/products.ts";


type ProdcutStore = {
    product: Product | null
    setProduct: (product: Product) => void
    removeProduct: () => void
};

export const useProductStore = create<ProdcutStore>((set) => ({
    product: getProduct(),
    setProduct: (product: Product) => {
        setProduct(product)
        set({product: product})
    },
    removeProduct: () => {
        removeProduct()
        set({product: null});
    },
}))