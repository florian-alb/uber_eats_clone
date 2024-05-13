import {Shop} from "@/types/shop.ts";
import {axiosInstance} from "@/main.tsx";

export async function getShops(categoryId?: string): Promise<Shop[]> {
    const res = categoryId ?
        await axiosInstance.get(`shop?categoryId=${categoryId}`) :
        await axiosInstance.get('shop')
    return (res.data);
}