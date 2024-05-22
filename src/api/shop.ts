import {Shop, ShopForm} from "@/types/shop.ts";
import {axiosInstance} from "@/main.tsx";
import {ProductForm} from "@/types/product.ts";

export async function getShops(categoryId?: string): Promise<Shop[]> {
    const res = categoryId ?
        await axiosInstance.get(`shop?categoryId=${categoryId}`) :
        await axiosInstance.get('shop')
    return (res.data);
}

export async function getShopById(id: string): Promise<Shop> {
    return await axiosInstance.get(`shop/${id}`).then(r => r.data)
}

export async function saveOrUpdateShop(data: ShopForm): Promise<ProductForm> {
    if (data.id) {
        return axiosInstance.put(`/shop/${data.id}`, data).then(r => r.data)
    } else {
        return axiosInstance.post(`/shop/`, data).then(r => r.data)
    }
}