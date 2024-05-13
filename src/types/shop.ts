import {Address} from "@/types/address.ts";
import {Order} from "@/types/order.ts";
import {Product} from "@/types/product.ts";
import {Category} from "@/types/category.ts";
import {Review} from "@/types/review.ts";

export type Shop = {
    id: string;
    name: string;
    image: string;
    addressId: string;
    orders: Order[];
    products: Product[];
    reviews: Review[];
    address: Address;
    category: Category;
}

export type ShopDisplay = Pick<Shop, 'id' | 'name' | 'image' | 'category' >