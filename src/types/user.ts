import {Address} from "@/types/address.ts";
import {Order} from "@/types/order.ts";
import {Shop} from "@/types/shop.ts";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    money: number | undefined;
    role: Role
    addresses: Address[]
    orders: Order[]
    shop: Shop
}

export type RegisterUser = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

enum Role {
    "USER",
    "SHOP",
    "ADMIN",
    "BANNED",
}