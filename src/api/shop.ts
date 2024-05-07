import axios from "axios";
import {Shop} from "@/types/shop.ts";

export async function getShops(categoryId?: string): Promise<Shop[]> {
    const res = categoryId ?
        await axios.get(`shop?categoryId=${categoryId}`) :
        await axios.get('shop')
    return (res.data);
}