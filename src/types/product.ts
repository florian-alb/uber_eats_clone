import {Order} from "@/types/order.ts";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    isPublished: boolean;
    createdAt: Date;
    image: string | null;
    menuId: string | null;
    shopId: string;
    quantity: number;
}

export type ProductWithOrders = Product & {
    orderProducts: Order[]
}

export type ProductForm = {
    id?: string;
    name?: string;
    description?: string;
    isPublished: boolean;
    price?: number;
    image: string | null;
    shopId?: string;
}