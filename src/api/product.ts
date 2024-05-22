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

export async function deleteProduct(id: string): Promise<void> {
    return axiosInstance.delete(`/product/${id}`).then(r => r.data)
}
