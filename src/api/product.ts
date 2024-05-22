import {axiosInstance} from "@/main.tsx";
import {Product, ProductForm} from "@/types/product.ts";

export async function getProductById(id: string): Promise<Product> {
    return axiosInstance.get(`/product/${id}`).then(r => r.data)
}

export async function saveOrUpdateProduct(data: ProductForm): Promise<ProductForm> {
    if (data.id) {
        return axiosInstance.put(`/product/${data.id}`, data).then(r => r.data)
    } else {
        return axiosInstance.post(`/product/`, data).then(r => r.data)
    }
}

export async function archiveProduct(id: string): Promise<void> {
    return axiosInstance.patch(`/product/${id}/archive`).then(r => r.data)
}
