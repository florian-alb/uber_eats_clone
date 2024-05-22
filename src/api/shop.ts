import {Shop} from "@/types/shop.ts";
import {axiosInstance} from "@/main.tsx";

export async function getShops(categoryId?: string): Promise<Shop[]> {
    const res = categoryId ?
        await axiosInstance.get(`shop?categoryId=${categoryId}`) :
        await axiosInstance.get('shop')
    return (res.data);
}

export async function getShopById(id: string): Promise<Shop> {
    return await axiosInstance.get(`shop/${id}`).then(r => r.data)
}