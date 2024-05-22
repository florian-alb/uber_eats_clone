import {Product} from "@/types/product.ts";

export function setProduct(product: Product | null) {
    localStorage.setItem('product', JSON.stringify(product));
}

export function getProduct() {
    const product = localStorage.getItem('product');
    if (product) return JSON.parse(product);
    return null;
}

export function removeProduct() {
    localStorage.removeItem('product');
}