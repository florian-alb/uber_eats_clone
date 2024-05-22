import {Order} from "@/types/order.ts";
import {axiosInstance} from "@/main.tsx";

export async function getOrdersByShopId(shopId: string): Promise<Order[]> {
    return axiosInstance.get(`order/shop/${shopId}`).then(r => r.data)
}