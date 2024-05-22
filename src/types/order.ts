import {User} from "@/types/user.ts";
import {Address} from "@/types/address.ts";
import {Shop} from "@/types/shop.ts";
import {Product} from "@/types/product.ts";

export type Order = {
    id: string
    createdAt: Date
    deliveryAddressId: string
    isDelivered: boolean
    userId: string
    shopId: string
    deliveryAddress: Address
    shop: Shop
    customer: User
    orderProducts: OrderProduct[]
}

type OrderProduct = {
    id: string
    orderId: string
    productId: string
    product: Product
}